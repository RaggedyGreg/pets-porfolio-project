/**
 * API Configuration
 * 
 * Supports both production backend and mock data for development.
 * 
 * Environment Variables:
 * - REACT_APP_API_URL: Base URL for the backend API (e.g., https://api.example.com/api)
 * 
 * The app will automatically use the appropriate configuration based on:
 * - Production: Uses REACT_APP_API_URL from .env.production
 * - Development: Uses mock data for standalone operation
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const config = {
  /**
   * Base URL for the backend API
   */
  apiBaseUrl: API_BASE_URL,
  
  /**
   * Flag to use mock data (development mode)
   */
  useMockData: !process.env.REACT_APP_API_URL || process.env.NODE_ENV === 'development',
};

/**
 * API Endpoints
 */
export const endpoints = {
  // Authentication
  register: () => `${config.apiBaseUrl}/auth/register`,
  login: () => `${config.apiBaseUrl}/auth/login`,
  profile: () => `${config.apiBaseUrl}/auth/profile`,
  
  // Pets
  getPets: () => `${config.apiBaseUrl}/pets`,
  getPetDetail: (id: string | number) => `${config.apiBaseUrl}/pets/${id}`,
  
  // Favorites
  getFavorites: () => `${config.apiBaseUrl}/favorites`,
  addFavorite: (petId: string | number) => `${config.apiBaseUrl}/favorites/${petId}`,
  removeFavorite: (petId: string | number) => `${config.apiBaseUrl}/favorites/${petId}`,
  
  // Health check
  health: () => `${config.apiBaseUrl}/health`,
};
