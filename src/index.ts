import { config } from "https://deno.land/x/dotenv/mod.ts";
import { RecordOfAny } from "./types/index.ts";
import { StudiesResponse } from "./types/prolific.ts";
import { buildNotificationPayload, getRandomNumber } from "./utils.ts";

const { PROLIFIC_BEARER_TOKEN, MIN_POLLING_TIME, MAX_POLLING_TIME } = config();

const fetchStudies = () => {
  return fetch("https://internal-api.prolific.co/api/v1/studies?current=1", {
    headers: { 
      Origin: 'https://app.prolific.co/',
      Referer: 'https://app.prolific.co/',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36',
      Authorization: `Bearer ${PROLIFIC_BEARER_TOKEN}` 
    },
  });
};

const sendNotification = (payload: RecordOfAny) => {
  return fetch(`https://api.pushover.net/1/messages.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const fetchAndNotify = async () => {
  const response = await fetchStudies();

  try {
    if (response.status >= 400) {
      throw new Error(`Failed to fetch Prolific studies [${response.status}]`);
    }
    
    if (response.status === 200) {
      const { results } = (await response.json()) as StudiesResponse;
      if (results.length === 0) return;

      for await (const study of results) {
        console.info(`New Study Available: ${study.id}`);

        const pusherResponse = await sendNotification(buildNotificationPayload(study));
        if (pusherResponse.status >= 400) {
          throw new Error(`Failed to send notification to Pushover [${response.status}]`);
        }
      }
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
      min: parseInt(MIN_POLLING_TIME ?? 15000, 10),
      max: parseInt(MAX_POLLING_TIME ?? 30000, 10),
    })
  );
};

console.info("Notification polling started…");
startPolling();
