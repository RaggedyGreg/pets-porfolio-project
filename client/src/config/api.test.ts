import { config, endpoints } from './api';

describe('API Configuration', () => {
  test('config exports apiBaseUrl', () => {
    expect(config.apiBaseUrl).toBeDefined();
    expect(typeof config.apiBaseUrl).toBe('string');
  });

  test('config exports useMockData flag', () => {
    expect(config.useMockData).toBeDefined();
    expect(typeof config.useMockData).toBe('boolean');
  });

  describe('endpoints', () => {
    test('register returns correct endpoint', () => {
      expect(endpoints.register()).toContain('/auth/register');
    });

    test('login returns correct endpoint', () => {
      expect(endpoints.login()).toContain('/auth/login');
    });

    test('profile returns correct endpoint', () => {
      expect(endpoints.profile()).toContain('/auth/profile');
    });

    test('getPets returns correct endpoint', () => {
      expect(endpoints.getPets()).toContain('/pets');
    });

    test('getPetDetail returns correct endpoint with id', () => {
      expect(endpoints.getPetDetail(123)).toContain('/pets/123');
      expect(endpoints.getPetDetail('abc')).toContain('/pets/abc');
    });

    test('getFavorites returns correct endpoint', () => {
      expect(endpoints.getFavorites()).toContain('/favorites');
    });

    test('addFavorite returns correct endpoint with petId', () => {
      expect(endpoints.addFavorite(456)).toContain('/favorites/456');
    });

    test('removeFavorite returns correct endpoint with petId', () => {
      expect(endpoints.removeFavorite(789)).toContain('/favorites/789');
    });

    test('health returns correct endpoint', () => {
      expect(endpoints.health()).toContain('/health');
    });
  });
});
