import { config } from "https://deno.land/x/dotenv/mod.ts";
import { StudiesResponse } from "./types/prolific.ts";
import { buildNotificationPayload, getRandomNumber } from "./utils.ts";

const { PROLIFIC_BEARER_TOKEN, MIN_POLLING_TIME, MAX_POLLING_TIME } = config();

const fetchStudies = () => {
  return fetch("https://internal-api.prolific.co/api/v1/studies?current=1", {
    headers: { Authorization: `Bearer ${PROLIFIC_BEARER_TOKEN}` },
  });
};

const sendNotification = (payload: Record<string, any>) => {
  return fetch(`https://api.pushover.net/1/messages.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const fetchAndNotify = async () => {
  const response = await fetchStudies();

  try {
    if (response.status === 200) {
      const { results } = (await response.json()) as StudiesResponse;
      if (results.length === 0) return;

      for await (const study of results) {
        console.info(
          "New Study",
          JSON.stringify(study, null, 2)
        );

        const pusherResponse = await sendNotification(buildNotificationPayload(study));
        if (pusherResponse.status >= 400) {
          throw new Error(`Failed to send notification to Pushover [${response.status}]`);
        }
      }
    } else if (response.status >= 400) {
      throw new Error(`Failed to fetch Prolific studies [${response.status}]`);
    }
  } catch (error) {
    console.error(error);
  }
};

const startPolling = () => {
  fetchAndNotify();

  setTimeout(
    startPolling,
    getRandomNumber({
      min: parseInt(MIN_POLLING_TIME ?? 15000),
      max: parseInt(MAX_POLLING_TIME ?? 30000, 10),
    })
  );
};

console.info("Notification polling started…");
startPolling();
