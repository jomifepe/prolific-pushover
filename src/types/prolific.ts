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
  study_type: StudyType;
  date_created: string;
  total_available_places: number;
  places_taken: number;
  reward: number;
  published_at: string;
  average_reward_per_hour: number;
  researcher: Researcher;
  description: string;
  estimated_completion_time: number;
  device_compatibility: DeviceCompatibility[];
  peripheral_requirements: PeripheralRequirements[];
  estimated_reward_per_hour: number;
  maximum_allowed_time: number;
  average_completion_time: number;
}

export type StudyStatus =
  | "UNPUBLISHED"
  | "SCHEDULED"
  | "ACTIVE"
  | "AWAITING REVIEW"
  | "PAUSED"
  | "COMPLETED";

export type Institution = {
    name?: any;
    logo?: any;
    link: string;
}

export type Researcher = {
    id: string;
    name: string;
    email: string;
    country: string;
    institution: Institution;
}

export type StudyType = "SINGLE" | "UK_REP_SAMPLE" | "US_REP_SAMPLE";

export type PeripheralRequirements = 'audio' | 'camera' | 'download' | 'microphone';

export type DeviceCompatibility = 'desktop' | 'tablet' | 'mobile';

