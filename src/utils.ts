import { config } from "https://deno.land/x/dotenv/mod.ts";

import { ProlificStudy } from "./types.ts";

const { PUSHOVER_TOKEN, PUSHOVER_USER } = config();

type GetRandomNumberOptions = { min: number; max: number };

export const getRandomNumber = (options: number | GetRandomNumberOptions) => {
  const { min, max } =
    typeof options === "number" ? { min: 0, max: options } : options;
  const difference = max - min;
  let randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * difference);
  randomNumber = randomNumber + min;

  return randomNumber;
};

export const buildNotificationPayload = (study: ProlificStudy) => {
  const placesLeft = study.total_available_places - study.places_taken;

  return {
    token: PUSHOVER_TOKEN,
    user: PUSHOVER_USER,
    title: "New Prolific Study Available",
    message: `
      Title: ${study.name}
      Reward: £${study.reward}
      Places: ${placesLeft}/${study.total_available_places}
    `,
  };
};
