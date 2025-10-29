import { useState, useEffect } from "react";
import { ApiResponseDetail } from "../interfaces/interfaces";

export const useFetchDetail = (url: string) => {
  const [data, setData] = useState<ApiResponseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
