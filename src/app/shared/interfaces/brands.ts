export interface brands {
  results: number;
  metadata: Metadata;
  data: DATA[];
}

export interface DATA {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}
