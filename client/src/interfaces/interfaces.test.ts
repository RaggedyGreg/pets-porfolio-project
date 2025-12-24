import { isDog, isCat, isBird, DogPet, CatPet, BirdPet, Pet } from './interfaces';

describe('Type Guards', () => {
  const dogPet: DogPet = {
    id: 1,
    name: 'Rex',
    kind: 'dog',
    weight: 300,
    height: 50,
    length: 100,
    photo_url: 'dog.jpg',
    description: 'A friendly dog',
  };

  const catPet: CatPet = {
    id: 2,
    name: 'Whiskers',
    kind: 'cat',
    weight: 200,
    height: 30,
    length: 50,
    photo_url: 'cat.jpg',
    description: 'A cute cat',
    number_of_lives: 9,
  };

  const birdPet: BirdPet = {
    id: 3,
    name: 'Tweety',
    kind: 'bird',
    weight: 50,
    height: 10,
    length: 20,
    photo_url: 'bird.jpg',
    description: 'A singing bird',
    wingspan: 40,
    num_of_feathers: 150,
  };

  describe('isDog()', () => {
    it('should return true for a dog pet', () => {
      expect(isDog(dogPet)).toBe(true);
    });

    it('should return false for a cat pet', () => {
      expect(isDog(catPet)).toBe(false);
    });

    it('should return false for a bird pet', () => {
      expect(isDog(birdPet)).toBe(false);
    });

    it('should enable type narrowing for dog-specific properties', () => {
      const pet: Pet = dogPet;
      expect(isDog(pet)).toBe(true);
      // Type narrowing works at compile time
      expect(pet.kind).toBe('dog');
      expect(pet.name).toBe('Rex');
    });
  });

  describe('isCat()', () => {
    it('should return true for a cat pet', () => {
      expect(isCat(catPet)).toBe(true);
    });

    it('should return false for a dog pet', () => {
      expect(isCat(dogPet)).toBe(false);
    });

    it('should return false for a bird pet', () => {
      expect(isCat(birdPet)).toBe(false);
    });

    it('should enable type narrowing for cat-specific properties', () => {
      const pet: Pet = catPet;
      expect(isCat(pet)).toBe(true);
      // Type guard allows safe access to cat-specific properties
      expect(pet.kind).toBe('cat');
      expect((pet as CatPet).number_of_lives).toBe(9);
    });
  });

  describe('isBird()', () => {
    it('should return true for a bird pet', () => {
      expect(isBird(birdPet)).toBe(true);
    });

    it('should return false for a dog pet', () => {
      expect(isBird(dogPet)).toBe(false);
    });

    it('should return false for a cat pet', () => {
      expect(isBird(catPet)).toBe(false);
    });

    it('should enable type narrowing for bird-specific properties', () => {
      const pet: Pet = birdPet;
      expect(isBird(pet)).toBe(true);
      // Type guard allows safe access to bird-specific properties
      expect(pet.kind).toBe('bird');
      expect((pet as BirdPet).wingspan).toBe(40);
      expect((pet as BirdPet).num_of_feathers).toBe(150);
    });
  });

  describe('Type narrowing in real scenarios', () => {
    it('should correctly identify and handle different pet types', () => {
      const pets: Pet[] = [dogPet, catPet, birdPet];
      
      // Test each pet type individually
      expect(isDog(pets[0])).toBe(true);
      expect(pets[0].kind).toBe('dog');
      
      expect(isCat(pets[1])).toBe(true);
      expect((pets[1] as CatPet).number_of_lives).toBeDefined();
      
      expect(isBird(pets[2])).toBe(true);
      expect((pets[2] as BirdPet).wingspan).toBeDefined();
      expect((pets[2] as BirdPet).num_of_feathers).toBeDefined();
    });

    it('should work with switch statements based on kind', () => {
      const pets: Pet[] = [dogPet, catPet, birdPet];
      const results: string[] = [];

      pets.forEach((pet) => {
        if (isDog(pet)) {
          results.push('dog');
        } else if (isCat(pet)) {
          results.push('cat');
        } else if (isBird(pet)) {
          results.push('bird');
        }
      });

      expect(results).toEqual(['dog', 'cat', 'bird']);
    });
  });
});
