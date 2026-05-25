import { useCallback, useState } from "react";
import axios from "axios";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(async (
    method,
    url,
    data = {},
    headers = {},
    config = { BASE_URL: "http://localhost:8000" },
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios({
        method,
        url: `${config.BASE_URL}${url}/`,
        data,
        headers,
      });
      return res.data;
    } catch (err) {
      console.dir(err)
      setError(`${err.response.statusText} - ${err.response.data["Error"]}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { request, isLoading, error };
};
