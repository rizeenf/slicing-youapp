import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const useAxios = ({ method, url, headers, data }: AxiosRequestConfig) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const res = await axios.request({ method, url, headers, data });
      setResponse(res.data);
    } catch (error) {
      setError(false);
      if (error instanceof AxiosError) {
        throw new Error(`${error.code}: Something went wrong ${error.message}`);
      }
      throw new Error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [method, url, headers, data]);

  return { response, error, isLoading };
};

export default useAxios;
