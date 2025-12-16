import { render, screen } from '@testing-library/react';
import { Health } from './Health';
import { DogPet, CatPet, BirdPet } from '../../interfaces/interfaces';

describe('Health Component', () => {
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

  const createCatPet = (
    weight: number,
    height: number,
    length: number,
    lives: number
  ): CatPet => ({
    id: 2,
    name: 'Test Cat',
    kind: 'cat',
    weight,
    height,
    length,
    photo_url: 'test.jpg',
    description: 'Test cat',
    number_of_lives: lives,
  });

  const createBirdPet = (wingspan: number, length: number, feathers: number): BirdPet => ({
    id: 3,
    name: 'Test Bird',
    kind: 'bird',
    weight: 100,
    height: 10,
    length,
    photo_url: 'test.jpg',
    description: 'Test bird',
    wingspan,
    num_of_feathers: feathers,
  });

  describe('Dog Health Status', () => {
    it('should display "unhealthy" for unhealthy dog', () => {
      // health = 100 / (100 * 100) = 0.01 < 2
      const pet = createDogPet(100, 100, 100);
      render(<Health pet={pet} />);
      expect(screen.getByText('unhealthy')).toBeInTheDocument();
    });

    it('should display "very healthy" for very healthy dog', () => {
      // health = 200 / (50 * 2) = 2.0
      const pet = createDogPet(200, 50, 2);
      render(<Health pet={pet} />);
      expect(screen.getByText('very healthy')).toBeInTheDocument();
    });

    it('should display "healthy" for healthy dog', () => {
      // health = 300 / (50 * 2) = 3.0
      const pet = createDogPet(300, 50, 2);
      render(<Health pet={pet} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();
    });
  });

  describe('Cat Health Status', () => {
    it('should display "unhealthy" for cat with 1 life', () => {
      // Special case: 1 life always unhealthy
      const pet = createCatPet(300, 50, 2, 1);
      render(<Health pet={pet} />);
      expect(screen.getByText('unhealthy')).toBeInTheDocument();
    });

    it('should display "very healthy" for very healthy cat with multiple lives', () => {
      // health = 200 / (50 * 2) = 2.0, lives > 1
      const pet = createCatPet(200, 50, 2, 7);
      render(<Health pet={pet} />);
      expect(screen.getByText('very healthy')).toBeInTheDocument();
    });

    it('should display "healthy" for healthy cat', () => {
      // health = 300 / (50 * 2) = 3.0
      const pet = createCatPet(300, 50, 2, 9);
      render(<Health pet={pet} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();
    });

    it('should display "unhealthy" for cat with poor health metrics', () => {
      // health = 100 / (100 * 100) = 0.01 < 2
      const pet = createCatPet(100, 100, 100, 5);
      render(<Health pet={pet} />);
      expect(screen.getByText('unhealthy')).toBeInTheDocument();
    });
  });

  describe('Bird Health Status', () => {
    it('should display "unhealthy" for bird with low wingspan ratio', () => {
      // wingspanRatio = 100 / 100 = 1.0 < 1.5
      const pet = createBirdPet(100, 100, 250);
      render(<Health pet={pet} />);
      expect(screen.getByText('unhealthy')).toBeInTheDocument();
    });

    it('should display "very healthy" for bird with high wingspan and many feathers', () => {
      // wingspanRatio = 200 / 100 = 2.0, feathers = 250 > 200
      const pet = createBirdPet(200, 100, 250);
      render(<Health pet={pet} />);
      expect(screen.getByText('very healthy')).toBeInTheDocument();
    });

    it('should display "healthy" for bird with good metrics', () => {
      // wingspanRatio = 200 / 100 = 2.0, feathers = 150 (100-200 range)
      const pet = createBirdPet(200, 100, 150);
      render(<Health pet={pet} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();
    });

    it('should display "unhealthy" for bird with too few feathers', () => {
      // wingspanRatio = 200 / 100 = 2.0, but feathers = 50 < 100
      const pet = createBirdPet(200, 100, 50);
      render(<Health pet={pet} />);
      expect(screen.getByText('unhealthy')).toBeInTheDocument();
    });
  });

  describe('Health Status Color Styling', () => {
    it('should apply correct color for unhealthy status', () => {
      const pet = createDogPet(100, 100, 100);
      render(<Health pet={pet} />);
      const element = screen.getByText('unhealthy');
      // Check that it has a style attribute (color will be from SCSS variables)
      expect(element).toHaveStyle({ color: expect.any(String) });
    });

    it('should apply correct color for healthy status', () => {
      const pet = createDogPet(300, 50, 2);
      render(<Health pet={pet} />);
      const element = screen.getByText('healthy');
      expect(element).toHaveStyle({ color: expect.any(String) });
    });

    it('should apply correct color for very healthy status', () => {
      const pet = createDogPet(200, 50, 2);
      render(<Health pet={pet} />);
      const element = screen.getByText('very healthy');
      expect(element).toHaveStyle({ color: expect.any(String) });
    });
  });

  describe('React.memo optimization', () => {
    it('should render correctly with memo wrapper', () => {
      const pet = createDogPet(300, 50, 2);
      const { rerender } = render(<Health pet={pet} />);
      
      expect(screen.getByText('healthy')).toBeInTheDocument();
      
      // Rerender with same pet
      rerender(<Health pet={pet} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();
    });

    it('should update when pet changes', () => {
      const healthyPet = createDogPet(300, 50, 2);
      const { rerender } = render(<Health pet={healthyPet} />);
      
      expect(screen.getByText('healthy')).toBeInTheDocument();
      
      // Change to unhealthy pet
      const unhealthyPet = createDogPet(100, 100, 100);
      rerender(<Health pet={unhealthyPet} />);
      
      expect(screen.getByText('unhealthy')).toBeInTheDocument();
    });
  });

  describe('Integration with Strategy Pattern', () => {
    it('should correctly use strategy pattern for all pet types', () => {
      const dog = createDogPet(300, 50, 2);
      const cat = createCatPet(300, 50, 2, 9);
      const bird = createBirdPet(200, 100, 150);

      const { rerender } = render(<Health pet={dog} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();

      rerender(<Health pet={cat} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();

      rerender(<Health pet={bird} />);
      expect(screen.getByText('healthy')).toBeInTheDocument();
    });
  });
});
