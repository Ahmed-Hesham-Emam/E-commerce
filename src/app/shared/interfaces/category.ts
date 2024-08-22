export interface categryResponse {
  results: number;
  metadata: Metadata;
  data: categry[];
}

export interface categry {
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
}