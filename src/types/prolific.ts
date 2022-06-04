export type StudiesResponse = {
  results: Study[];
  _links: Links;
  meta: Meta;
};

export type SelfLinks = {
  href: string;
  title: string;
};

export type NextLinks = {
  href?: string;
  title: string;
};

export type PreviousLinks = {
  href?: string;
  title: string;
};

export type LastLinks = {
  href: string;
  title: string;
};

export type Links = {
  self: SelfLinks;
  next: NextLinks;
  previous: PreviousLinks;
  last: LastLinks;
};

export type Meta = {
  count: number;
};

export type Study = {
  id: string;
  name: string;
  internal_name: string | null;
  status: StudyStatus;
  study_type: StudyType;
  total_available_places: number;
  places_taken: number;
  number_of_submissions: number;
  reward: number;
  total_cost: number;
  publish_at: string;
  date_created: string;
  // deno-lint-ignore no-explicit-any
  [key: string]: any;
};

export type StudyType = "SINGLE" | "UK_REP_SAMPLE" | "US_REP_SAMPLE";

export type StudyStatus =
  | "UNPUBLISHED"
  | "SCHEDULED"
  | "ACTIVE"
  | "AWAITING REVIEW"
  | "PAUSED"
  | "COMPLETED";
