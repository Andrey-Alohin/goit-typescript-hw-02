import axios from "axios";
import { ApiResponse } from "./types/response";

const apiKey = "_Zpx0ecEieGrEwbZ1-IrRyHOAYBd_lNuZTPjMAIM8nI";
axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchImages = async (search: string, page: number) => {
  const response = await axios.get<ApiResponse>("search/photos", {
    params: {
      query: search,
      page: page,
      client_id: apiKey,
    },
  });

  return response.data;
};
