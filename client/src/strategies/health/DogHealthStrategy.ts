import { Pet, HealthStatus } from "../../interfaces/interfaces";
import { HealthStrategy } from "./HealthStrategy";

export class DogHealthStrategy implements HealthStrategy {
    calculate(pet: Pet): HealthStatus {
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
