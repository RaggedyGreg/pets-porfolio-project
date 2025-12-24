import { HealthStrategy } from './HealthStrategy';
import { DogHealthStrategy } from './DogHealthStrategy';
import { CatHealthStrategy } from './CatHealthStrategy';
import { BirdHealthStrategy } from './BirdHealthStrategy';
import { Pet, HealthStatus } from '../../interfaces/interfaces';

export class HealthStrategyFactory {
  private static strategies: Map<string, HealthStrategy> = new Map([
    ['dog', new DogHealthStrategy()],
    ['cat', new CatHealthStrategy()],
    ['bird', new BirdHealthStrategy()],
  ]);

  static getStrategy(petKind: string): HealthStrategy {
    const strategy = this.strategies.get(petKind);
    
    if (!strategy) {
      // Default to dog strategy for unknown pet types
      console.warn(`No health strategy found for pet kind: ${petKind}, using default`);
      return this.strategies.get('dog')!;
    }
    
    return strategy;
  }

  // Convenience method for direct calculation
  static calculateHealth(pet: Pet): HealthStatus {
    const strategy = this.getStrategy(pet.kind);
    return strategy.calculate(pet);
  }
}