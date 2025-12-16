import { useState, useEffect } from "react";
import { ApiResponseDetail } from "../interfaces/interfaces";
import { getPetById } from "../services/mockData";

/**
 * Custom hook for fetching individual pet details
 * Currently uses mock data but can be easily switched to a real API
 */
export const useFetchDetail = (url: string) => {
  const [data, setData] = useState<ApiResponseDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate network delay for realistic behavior
        await new Promise(resolve => setTimeout(resolve, 200));

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

        setData(pet);
      } catch (error) {
        setError((error as Error).message || "Failed to load pet details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
