import { DogHealthStrategy } from './DogHealthStrategy';
import { DogPet } from '../../interfaces/interfaces';

describe('DogHealthStrategy', () => {
  let strategy: DogHealthStrategy;
  
  beforeEach(() => {
    strategy = new DogHealthStrategy();
  });

  const createDogPet = (weight: number, height: number, length: number): DogPet => ({
    id: 1,
    name: 'Test Dog',
    kind: 'dog',
    weight,
    height,
    length,
    photo_url: 'test.jpg',
    description: 'Test dog',
  });

  describe('calculate()', () => {
    it('should return "unhealthy" when health is less than 2', () => {
      // health = 100 / (100 * 100) = 0.01 < 2
      const pet = createDogPet(100, 100, 100);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "unhealthy" when health is greater than 5', () => {
      // health = 1000 / (10 * 10) = 10 > 5
      const pet = createDogPet(1000, 10, 10);
      expect(strategy.calculate(pet)).toBe('unhealthy');
    });

    it('should return "very healthy" when health is between 2 and 3 (inclusive of 2, exclusive of 3)', () => {
      // health = 200 / (50 * 2) = 2.0
      const pet1 = createDogPet(200, 50, 2);
      expect(strategy.calculate(pet1)).toBe('very healthy');

      // health = 299 / (50 * 2) = 2.99 < 3
      const pet2 = createDogPet(299, 50, 2);
      expect(strategy.calculate(pet2)).toBe('very healthy');
    });

    it('should return "healthy" when health is between 3 and 5 (inclusive)', () => {
      // health = 300 / (50 * 2) = 3.0
      const pet1 = createDogPet(300, 50, 2);
      expect(strategy.calculate(pet1)).toBe('healthy');

      // health = 500 / (50 * 2) = 5.0
      const pet2 = createDogPet(500, 50, 2);
      expect(strategy.calculate(pet2)).toBe('healthy');

      // health = 400 / (50 * 2) = 4.0
      const pet3 = createDogPet(400, 50, 2);
      expect(strategy.calculate(pet3)).toBe('healthy');
    });

    it('should handle edge case: health exactly at 2', () => {
      // health = 200 / (50 * 2) = 2.0
      const pet = createDogPet(200, 50, 2);
      expect(strategy.calculate(pet)).toBe('very healthy');
    });

    it('should handle edge case: health exactly at 5', () => {
      // health = 500 / (50 * 2) = 5.0
      const pet = createDogPet(500, 50, 2);
      expect(strategy.calculate(pet)).toBe('healthy');
    });
  });
});
