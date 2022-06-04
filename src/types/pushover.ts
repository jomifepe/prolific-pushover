export type NotificationSound =
  | "pushover"
  | "bike"
  | "bugle"
  | "cashregister"
  | "classical"
  | "cosmic"
  | "falling"
  | "gamelan"
  | "incoming"
  | "intermission"
  | "magic"
  | "mechanical"
  | "pianobar"
  | "siren"
  | "spacealarm"
  | "tugboat"
  | "alien"
  | "climb"
  | "persistent"
  | "echo"
  | "updown"
  | "vibrate"
  | "none";

export type NotificationPayload = {
  token: string;
  user: string;
  message: string;
  title?: string;
  sound?: NotificationSound;
  device?: string;
  priority?: NotificationPriority;
  url?: string;
  url_title?: string;
};

export type NotificationPriority = -2 | -1 | 0 | 1 | 2