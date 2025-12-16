import { HealthStrategy } from './HealthStrategy';
import { BirdPet, HealthStatus } from '../../interfaces/interfaces';

export class BirdHealthStrategy implements HealthStrategy {
  calculate(pet: BirdPet): HealthStatus {
    const wingspanRatio = pet.wingspan / pet.length;
    
    // Priority 1: Check wingspan ratio
    if (wingspanRatio < 1.5) {
      return 'unhealthy';
    }
    
    // Priority 2: Check feather count for very healthy
    if (pet.num_of_feathers > 200) {
      return 'very healthy';
    }
    
    // Priority 3: Check feather count for unhealthy
    if (pet.num_of_feathers < 100) {
      return 'unhealthy';
    }
    
    // Default: healthy
    return 'healthy';
  }
}