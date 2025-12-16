import { useState, useEffect } from "react";
import { ApiResponse, PetPaginationModel, PetSortModel } from "../interfaces/interfaces";
import { getPaginatedPets } from "../services/mockData";

/**
 * Custom hook for fetching paginated and sorted pet data
 * Currently uses mock data but can be easily switched to a real API
 */
export const useFetch = (url: string, paginationModel: PetPaginationModel, sortModel: PetSortModel) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate network delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 300));

        // Use mock data service
        const result = getPaginatedPets(
          paginationModel.page,
          paginationModel.pageSize,
          sortModel.sortField,
          sortModel.sortOrder
        );

        setData({ 
          rows: result.data, 
          totalCount: result.total 
        });
      } catch (error) {
        setError((error as Error).message || "Failed to load pets");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paginationModel.page, paginationModel.pageSize, sortModel.sortField, sortModel.sortOrder]);

  return { data, loading, error };
};
