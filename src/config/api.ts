/**
 * API Configuration
 * 
 * Currently using mock data service for standalone operation.
 * This allows the app to work without external API dependencies.
 * 
 * To switch to a real backend in the future:
 * 1. Set REACT_APP_API_BASE_URL in .env
 * 2. Update useFetch and useFetchDetail hooks to use fetch() instead of mock data
 * 3. Remove mockData imports from hooks
 * 
 * Original challenge API (reference only):
 * - https://my-json-server.typicode.com/Feverup/fever_pets_data/pets
 * - https://my-json-server.typicode.com/Feverup/fever_pets_data_test/pets (with birds)
 */

export const config = {
  /**
   * Base URL for the Pets API
   * Currently a placeholder - app uses mock data
   */
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '/api/pets',
};

/**
 * API Endpoints
 * These are kept for future backend integration
 */
export const endpoints = {
  /**
   * Get list of pets with pagination and sorting
   * @returns Base URL for pets list
   */
  getPets: () => config.apiBaseUrl,
  
  /**
   * Get details for a specific pet
   * @param id - Pet ID
   * @returns URL for pet detail
   */
  getPetDetail: (id: string | number) => `${config.apiBaseUrl}/${id}`,
};
