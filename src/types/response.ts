import { Image } from "./image";

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}
