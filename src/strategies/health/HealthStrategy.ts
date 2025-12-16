import { Pet, HealthStatus } from "../../interfaces/interfaces";

export interface HealthStrategy {
    calculate(pet: Pet): HealthStatus;
}
