import { config } from "https://deno.land/x/dotenv/mod.ts";

import { StudiesResponse } from "./types.ts";
import { getRandomNumber } from "./utils.ts";

const { BEARER_TOKEN, PUSHER_TOKEN, PUSHER_USER } = config();

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
    const content = (await response.json()) as StudiesResponse;
    console.log({ count: content.results.length });

    if (content.results.length > 0) {
      await fetch(`https://api.pushover.net/1/messages.json`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: PUSHER_TOKEN,
          user: PUSHER_USER,
          title: "New Prolific Study Available",
          message: "Test",
        }),
      });
    }
  }
};

const startPolling = () => {
  fetchStudies();
  setTimeout(startPolling, getRandomNumber({ min: 15000, max: 30000 }));
};

startPolling();
