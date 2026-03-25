import { apiUrl } from "@/constants/api-urls";
import { fetchWithRetry } from "@/helpers/fetch-with-retry";

export const getRandomUsers = async (results = 100) => {
  const url = `${apiUrl.user}/?results=${results}`;
  try {
    const res = await fetchWithRetry(url);
    // console.log({ res });

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};