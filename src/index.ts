import { config } from "https://deno.land/x/dotenv/mod.ts";

import { ProlificStudiesResponse, ProlificStudy } from "./types.ts";
import { getRandomNumber } from "./utils.ts";

const { BEARER_TOKEN, PUSHOVER_TOKEN, PUSHOVER_USER } = config();

const buildNotificationContent = (study: ProlificStudy) => {
  const placesLeft = study.total_available_places - study.places_taken;

  return JSON.stringify({
    token: PUSHOVER_TOKEN,
    user: PUSHOVER_USER,
    title: "New Prolific Study Available",
    message: `
      Title: ${study.name}
      Reward: £${study.reward}
      Places: ${placesLeft}/${study.total_available_places}
    `,
  })
}

const fetchStudies = async () => {
  const response = await fetch(
    "https://internal-api.prolific.co/api/v1/studies?current=1",
    {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );

  if (response.status === 200) {
    const content = (await response.json()) as ProlificStudiesResponse;

    if (content.results.length > 0) {
      for await (const study of content.results) {
        console.info('New Prolific Study Available', JSON.stringify(study, null, 2))

        await fetch(`https://api.pushover.net/1/messages.json`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: buildNotificationContent(study),
        });
      }
    }
  }
};

const startPolling = () => {
  fetchStudies();
  setTimeout(startPolling, getRandomNumber({ min: 15000, max: 30000 }));
};

console.info('Notification polling started…')
startPolling();
