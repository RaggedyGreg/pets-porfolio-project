import { useState, useEffect, useRef } from "react";
import { ApiResponse, PetPaginationModel, PetSortModel } from "../interfaces/interfaces";
import { getPaginatedPets } from "../services/mockData";

/**
 * Custom hook for fetching paginated and sorted pet data
 * Includes abort signal support and automatic retry logic
 */
export const useFetch = (
  url: string, 
  paginationModel: PetPaginationModel, 
  sortModel: PetSortModel,
  maxRetries: number = 2
) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setLoading(true);
      setError(null);

      try {
        // Simulate network delay for realistic behavior
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 300);
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Request aborted'));
          });
        });

        // Check if aborted
        if (signal.aborted) {
          throw new Error('Request aborted');
        }

        // Use mock data service
        const result = getPaginatedPets(
          paginationModel.page,
          paginationModel.pageSize,
          sortModel.sortField,
          sortModel.sortOrder
        );

        if (!signal.aborted) {
          setData({ 
            rows: result.data, 
            totalCount: result.total 
          });
          setRetryCount(0); // Reset retry count on success
        }
      } catch (err) {
        if (!signal.aborted) {
          const errorObj = err instanceof Error ? err : new Error("Failed to load pets");
          
          // Retry logic for transient errors
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
          } else {
            setError(errorObj);
          }
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to abort request on unmount or when dependencies change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [paginationModel.page, paginationModel.pageSize, sortModel.sortField, sortModel.sortOrder, retryCount, maxRetries]);

  return { data, loading, error };
};
