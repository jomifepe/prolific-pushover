export type ProlificStudiesResponse = {
  results: ProlificStudy[];
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

export type ProlificStudy = {
  id: string;
  name: string;
  internal_name: string | null;
  status: ProlificStudyStatus;
  study_type: ProlificStudyType;
  total_available_places: number;
  places_taken: number;
  number_of_submissions: number;
  reward: number;
  total_cost: number;
  publish_at: string;
  date_created: string;
  [key: string]: any;
}

export type ProlificStudyType = 'SINGLE' | 'UK_REP_SAMPLE' | 'US_REP_SAMPLE';

export type ProlificStudyStatus = 'UNPUBLISHED' | 'SCHEDULED' | 'ACTIVE' | 'AWAITING REVIEW' | 'PAUSED' | 'COMPLETED';