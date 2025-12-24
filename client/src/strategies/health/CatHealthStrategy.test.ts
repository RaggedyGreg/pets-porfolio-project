import { CatHealthStrategy } from './CatHealthStrategy';
import { CatPet } from '../../interfaces/interfaces';

describe('CatHealthStrategy', () => {
  let strategy: CatHealthStrategy;
  
  beforeEach(() => {
    strategy = new CatHealthStrategy();
  });

  const createCatPet = (
    weight: number,
    height: number,
    length: number,
    number_of_lives: number
  ): CatPet => ({
    id: 1,
    name: 'Test Cat',
    kind: 'cat',
    weight,
    height,
    length,
    photo_url: 'test.jpg',
    description: 'Test cat',
    number_of_lives,
  });

  describe('calculate()', () => {
    it('should return "unhealthy" when cat has only 1 life (special case)', () => {
      // health = 300 / (50 * 2) = 3.0 would be healthy, but 1 life overrides
      const pet = createCatPet(300, 50, 2, 1);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "unhealthy" when health is less than 2 (and lives > 1)', () => {
      // health = 100 / (100 * 100) = 0.01 < 2
      const pet = createCatPet(100, 100, 100, 5);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "unhealthy" when health is greater than 5 (and lives > 1)', () => {
      // health = 1000 / (10 * 10) = 10 > 5
      const pet = createCatPet(1000, 10, 10, 9);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "very healthy" when health is between 2 and 3 (and lives > 1)', () => {
      // health = 200 / (50 * 2) = 2.0
      const pet1 = createCatPet(200, 50, 2, 7);
      expect(strategy.calculate(pet1)).toBe('very healthy');

      // health = 299 / (50 * 2) = 2.99 < 3
      const pet2 = createCatPet(299, 50, 2, 3);
      expect(strategy.calculate(pet2)).toBe('very healthy');
    });

    it('should return "healthy" when health is between 3 and 5 (and lives > 1)', () => {
      // health = 300 / (50 * 2) = 3.0
      const pet1 = createCatPet(300, 50, 2, 4);
      expect(strategy.calculate(pet1)).toBe('healthy');

      // health = 500 / (50 * 2) = 5.0
      const pet2 = createCatPet(500, 50, 2, 8);
      expect(strategy.calculate(pet2)).toBe('healthy');

      // health = 400 / (50 * 2) = 4.0
      const pet3 = createCatPet(400, 50, 2, 2);
      expect(strategy.calculate(pet3)).toBe('healthy');
    });

    it('should prioritize 1 life rule over health calculation', () => {
      // Even with perfect health range, 1 life means unhealthy
      // health = 250 / (50 * 2) = 2.5 (would be "very healthy")
      const pet = createCatPet(250, 50, 2, 1);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should handle edge case: health exactly at 2 with multiple lives', () => {
      // health = 200 / (50 * 2) = 2.0
      const pet = createCatPet(200, 50, 2, 9);
      expect(strategy.calculate(pet)).toBe('very healthy');
    });

    it('should handle edge case: health exactly at 5 with multiple lives', () => {
      // health = 500 / (50 * 2) = 5.0
      const pet = createCatPet(500, 50, 2, 6);
      expect(strategy.calculate(pet)).toBe('healthy');
    });
  });
});
