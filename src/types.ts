export type StudiesResponse = {
  results: any[];
  _links: Links;
  meta: Meta;
};
export type SelfLinks = {
  href: string;
  title: string;
};
export type NextLinks = {
  href?: any;
  title: string;
};
export type PreviousLinks = {
  href?: any;
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