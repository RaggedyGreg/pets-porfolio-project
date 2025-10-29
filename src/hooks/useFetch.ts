import { useState, useEffect } from "react";
import { ApiResponse, PetPaginationModel, PetSortModel } from "../interfaces/interfaces";

export const useFetch = (url: string, paginationModel: PetPaginationModel, sortModel: PetSortModel) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUrl = (url: string, paginationModel: PetPaginationModel, sortModel: PetSortModel) => {
      let paginatedUrl = `${url}?_start=${paginationModel.page * paginationModel.pageSize}&_limit=${paginationModel.pageSize}`;

      if(sortModel.sortField !== ""){
        paginatedUrl += `&_sort=${sortModel.sortField}&_order=${sortModel.sortOrder?.toUpperCase()}` 
      }
      return paginatedUrl;
    };

    const fetchData = async () => {
      try {
        const urlToFetch = getUrl(url, paginationModel, sortModel);
        const response = await fetch(urlToFetch);
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const responseData = await response.json();
        const totalCount = Number(response.headers.get("x-total-count"));
        setData({ rows: responseData, totalCount: totalCount });
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel, sortModel, url]);

  return { data, loading, error };
};
