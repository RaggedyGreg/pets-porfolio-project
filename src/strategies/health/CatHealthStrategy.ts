import { HealthStrategy } from './HealthStrategy';
import { CatPet, HealthStatus } from '../../interfaces/interfaces';

export class CatHealthStrategy implements HealthStrategy {
  calculate(pet: CatPet): HealthStatus {
    // Special case: cats with 1 life are always unhealthy
    if (pet.number_of_lives === 1) {
      return 'unhealthy';
    }
    
    const health = pet.weight / (pet.height * pet.length);
    
    if (health < 2 || health > 5) {
      return 'unhealthy';
    }
    
    if (health >= 2 && health < 3) {
      return 'very healthy';
    }
    
    return 'healthy';
  }
}