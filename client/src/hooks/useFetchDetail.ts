import { useState, useEffect, useRef } from "react";
import { ApiResponseDetail } from "../interfaces/interfaces";
import { getPetById } from "../services/mockData";

/**
 * Custom hook for fetching individual pet details
 * Includes abort signal support and automatic retry logic
 */
export const useFetchDetail = (url: string, maxRetries: number = 2) => {
  const [data, setData] = useState<ApiResponseDetail | null>(null);
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
          const timeout = setTimeout(resolve, 200);
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Request aborted'));
          });
        });

        // Check if aborted
        if (signal.aborted) {
          throw new Error('Request aborted');
        }

        // Extract ID from URL (supports both /pets/123 and /pets/:id patterns)
        const idMatch = url.match(/\/(\d+)$/);
        const petId = idMatch ? parseInt(idMatch[1], 10) : null;

        if (petId === null) {
          throw new Error("Invalid pet ID");
        }

        // Use mock data service
        const pet = getPetById(petId);

        if (!pet) {
          throw new Error("Pet not found");
        }

        if (!signal.aborted) {
          setData(pet);
          setRetryCount(0); // Reset retry count on success
        }
      } catch (err) {
        if (!signal.aborted) {
          const errorObj = err instanceof Error ? err : new Error("Failed to load pet details");
          
          // Retry logic
          if (retryCount < maxRetries && errorObj.message !== "Pet not found") {
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

    // Cleanup function to abort request on unmount or when URL changes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, retryCount, maxRetries]);

  return { data, loading, error };
};
