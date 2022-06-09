import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { DeviceCompatibility, Study } from "./types/prolific.ts";
import { NotificationPayload } from "./types/pushover.ts";

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

export const buildNotificationPayload = (study: Study): NotificationPayload => {
  const placesLeft = study.total_available_places - study.places_taken;
  const description = study.description.substring(0, 256) + (study.description.length > 256 ? '…' : '');
  const reward = `£${study.reward * 0.01} • £${study.average_reward_per_hour * 0.01}/hr`;
  const url = `https://app.prolific.co/studies/${study.id}`;

  return {
    url,
    sound: 'vibrate',
    token: PUSHOVER_TOKEN,
    user: PUSHOVER_USER,
    title: "New Prolific Study Available",
    message: `ℹ️ Title: ${study.name}
💵 Reward: ${reward}
🕑 Average completion time: ${study.average_completion_time} min
👥 Places: ${placesLeft}/${study.total_available_places}
💻 Compatibility: ${study.device_compatibility.join(', ')}
ℹ️ Description: ${description}`,
  };
};
