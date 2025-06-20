import axios from "axios";

const apiKey = "_Zpx0ecEieGrEwbZ1-IrRyHOAYBd_lNuZTPjMAIM8nI";
axios.defaults.baseURL = "https://api.unsplash.com/";
export const fetchImages = async (search, page) => {
  const response = await axios.get("search/photos", {
    params: {
      query: search,
      page: page,
      client_id: apiKey,
    },
  });

  return response.data;
};
