import { BirdHealthStrategy } from './BirdHealthStrategy';
import { BirdPet } from '../../interfaces/interfaces';

describe('BirdHealthStrategy', () => {
  let strategy: BirdHealthStrategy;
  
  beforeEach(() => {
    strategy = new BirdHealthStrategy();
  });

  const createBirdPet = (
    wingspan: number,
    length: number,
    num_of_feathers: number
  ): BirdPet => ({
    id: 1,
    name: 'Test Bird',
    kind: 'bird',
    weight: 100,
    height: 10,
    length,
    photo_url: 'test.jpg',
    description: 'Test bird',
    wingspan,
    num_of_feathers,
  });

  describe('calculate()', () => {
    it('should return "unhealthy" when wingspan ratio is less than 1.5 (priority 1)', () => {
      // wingspanRatio = 100 / 100 = 1.0 < 1.5
      // Even with high feather count, wingspan ratio takes priority
      const pet = createBirdPet(100, 100, 250);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "unhealthy" when wingspan ratio is exactly 1.4', () => {
      // wingspanRatio = 140 / 100 = 1.4 < 1.5
      const pet = createBirdPet(140, 100, 150);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "very healthy" when wingspan ratio >= 1.5 and feathers > 200', () => {
      // wingspanRatio = 150 / 100 = 1.5 >= 1.5
      // num_of_feathers = 250 > 200
      const pet = createBirdPet(150, 100, 250);
      expect(strategy.calculate(pet)).toBe('very healthy');
    });

    it('should return "very healthy" when wingspan ratio >= 1.5 and feathers = 201', () => {
      // wingspanRatio = 200 / 100 = 2.0 >= 1.5
      // num_of_feathers = 201 > 200
      const pet = createBirdPet(200, 100, 201);
      expect(strategy.calculate(pet)).toBe('very healthy');
    });

    it('should return "unhealthy" when wingspan ratio >= 1.5 but feathers < 100', () => {
      // wingspanRatio = 200 / 100 = 2.0 >= 1.5
      // num_of_feathers = 50 < 100 (priority 3)
      const pet = createBirdPet(200, 100, 50);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "unhealthy" when wingspan ratio >= 1.5 and feathers = 99', () => {
      // wingspanRatio = 180 / 100 = 1.8 >= 1.5
      // num_of_feathers = 99 < 100
      const pet = createBirdPet(180, 100, 99);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "healthy" when wingspan ratio >= 1.5 and feathers between 100-200', () => {
      // wingspanRatio = 200 / 100 = 2.0 >= 1.5
      // num_of_feathers = 150 (100 <= 150 <= 200)
      const pet = createBirdPet(200, 100, 150);
      expect(strategy.calculate(pet)).toBe('healthy');
    });

    it('should return "healthy" when wingspan ratio >= 1.5 and feathers = 100 (edge case)', () => {
      // wingspanRatio = 160 / 100 = 1.6 >= 1.5
      // num_of_feathers = 100 (exactly at lower bound)
      const pet = createBirdPet(160, 100, 100);
      expect(strategy.calculate(pet)).toBe('healthy');
    });

    it('should return "healthy" when wingspan ratio >= 1.5 and feathers = 200 (edge case)', () => {
      // wingspanRatio = 150 / 100 = 1.5 >= 1.5
      // num_of_feathers = 200 (exactly at upper bound for healthy)
      const pet = createBirdPet(150, 100, 200);
      expect(strategy.calculate(pet)).toBe('healthy');
    });

    it('should handle very high wingspan ratios', () => {
      // wingspanRatio = 500 / 100 = 5.0 >= 1.5
      // num_of_feathers = 300 > 200
      const pet = createBirdPet(500, 100, 300);
      expect(strategy.calculate(pet)).toBe('very healthy');
    });

    it('should prioritize wingspan ratio over feather count', () => {
      // Even with perfect feather count, low wingspan ratio means unhealthy
      // wingspanRatio = 100 / 100 = 1.0 < 1.5
      // num_of_feathers = 250 > 200 (would be very healthy if wingspan was ok)
      const pet = createBirdPet(100, 100, 250);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });
  });
});
