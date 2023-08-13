import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: "Bearer " + import.meta.env.VITE_APP_FILMHUB_TOKEN,
};

const fetchDataFromApi = async (url, params) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers,
      params,
    });

    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchDataFromApi;
