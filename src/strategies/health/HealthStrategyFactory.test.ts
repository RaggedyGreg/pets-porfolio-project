import { HealthStrategyFactory } from './HealthStrategyFactory';
import { DogHealthStrategy } from './DogHealthStrategy';
import { CatHealthStrategy } from './CatHealthStrategy';
import { BirdHealthStrategy } from './BirdHealthStrategy';
import { DogPet, CatPet, BirdPet } from '../../interfaces/interfaces';

describe('HealthStrategyFactory', () => {
  const createDogPet = (): DogPet => ({
    id: 1,
    name: 'Test Dog',
    kind: 'dog',
    weight: 300,
    height: 50,
    length: 2,
    photo_url: 'test.jpg',
    description: 'Test dog',
  });

  const createCatPet = (): CatPet => ({
    id: 2,
    name: 'Test Cat',
    kind: 'cat',
    weight: 300,
    height: 50,
    length: 2,
    photo_url: 'test.jpg',
    description: 'Test cat',
    number_of_lives: 7,
  });

  const createBirdPet = (): BirdPet => ({
    id: 3,
    name: 'Test Bird',
    kind: 'bird',
    weight: 100,
    height: 10,
    length: 100,
    photo_url: 'test.jpg',
    description: 'Test bird',
    wingspan: 200,
    num_of_feathers: 150,
  });

  describe('getStrategy()', () => {
    it('should return DogHealthStrategy for dog kind', () => {
      const strategy = HealthStrategyFactory.getStrategy('dog');
      expect(strategy).toBeInstanceOf(DogHealthStrategy);
    });

    it('should return CatHealthStrategy for cat kind', () => {
      const strategy = HealthStrategyFactory.getStrategy('cat');
      expect(strategy).toBeInstanceOf(CatHealthStrategy);
    });

    it('should return BirdHealthStrategy for bird kind', () => {
      const strategy = HealthStrategyFactory.getStrategy('bird');
      expect(strategy).toBeInstanceOf(BirdHealthStrategy);
    });

    it('should return default strategy (DogHealthStrategy) for unknown pet kind', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const strategy = HealthStrategyFactory.getStrategy('hamster');
      
      expect(strategy).toBeInstanceOf(DogHealthStrategy);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No health strategy found for pet kind: hamster, using default'
      );
      
      consoleWarnSpy.mockRestore();
    });

    it('should log warning for unknown pet kind', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      HealthStrategyFactory.getStrategy('rabbit');
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'No health strategy found for pet kind: rabbit, using default'
      );
      
      consoleWarnSpy.mockRestore();
    });
  });

  describe('calculateHealth()', () => {
    it('should calculate health for dog using DogHealthStrategy', () => {
      const dogPet = createDogPet();
      // health = 300 / (50 * 2) = 3.0 -> "healthy"
      const result = HealthStrategyFactory.calculateHealth(dogPet);
      expect(result).toBe('healthy');
    });

    it('should calculate health for cat using CatHealthStrategy', () => {
      const catPet = createCatPet();
      // health = 300 / (50 * 2) = 3.0 -> "healthy" (with 7 lives)
      const result = HealthStrategyFactory.calculateHealth(catPet);
      expect(result).toBe('healthy');
    });

    it('should calculate health for bird using BirdHealthStrategy', () => {
      const birdPet = createBirdPet();
      // wingspanRatio = 200 / 100 = 2.0 >= 1.5
      // num_of_feathers = 150 (100 <= 150 <= 200) -> "healthy"
      const result = HealthStrategyFactory.calculateHealth(birdPet);
      expect(result).toBe('healthy');
    });

    it('should handle cat with 1 life (special case)', () => {
      const catPet: CatPet = {
        ...createCatPet(),
        number_of_lives: 1,
      };
      const result = HealthStrategyFactory.calculateHealth(catPet);
      expect(result).toBe('unhealthy');
    });

    it('should handle unhealthy dog', () => {
      const dogPet: DogPet = {
        ...createDogPet(),
        weight: 1000,
        height: 10,
        length: 10,
      };
      // health = 1000 / (10 * 10) = 10 > 5 -> "unhealthy"
      const result = HealthStrategyFactory.calculateHealth(dogPet);
      expect(result).toBe('unhealthy');
    });

    it('should handle very healthy bird', () => {
      const birdPet: BirdPet = {
        ...createBirdPet(),
        wingspan: 200,
        length: 100,
        num_of_feathers: 250,
      };
      // wingspanRatio = 200 / 100 = 2.0 >= 1.5
      // num_of_feathers = 250 > 200 -> "very healthy"
      const result = HealthStrategyFactory.calculateHealth(birdPet);
      expect(result).toBe('very healthy');
    });
  });

  describe('strategy caching', () => {
    it('should return the same strategy instance for multiple calls', () => {
      const strategy1 = HealthStrategyFactory.getStrategy('dog');
      const strategy2 = HealthStrategyFactory.getStrategy('dog');
      expect(strategy1).toBe(strategy2);
    });

    it('should return different strategy instances for different kinds', () => {
      const dogStrategy = HealthStrategyFactory.getStrategy('dog');
      const catStrategy = HealthStrategyFactory.getStrategy('cat');
      expect(dogStrategy).not.toBe(catStrategy);
    });
  });
});
