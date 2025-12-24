import { FC, memo } from "react";
import { Pet, HealthStatus } from "../../interfaces/interfaces";
import variables from "../../scss/variables.module.scss";
import { HealthStrategyFactory } from "../../strategies/health/HealthStrategyFactory";

interface HealthProps {
  pet: Pet;
}

export const Health: FC<HealthProps> = memo(({ pet }) => {
  const healthStatus: HealthStatus = HealthStrategyFactory.calculateHealth(pet);
  
  const getHealthColor = (status: HealthStatus): string => {
    switch (status) {
      case 'unhealthy':
        return variables.healthUnhealthy;
      case 'very healthy':
        return variables.healthVeryHealthy;
      case 'healthy':
        return variables.healthHealthy;
      default:
        return variables.healthHealthy;
    }
  };

  return (
    <span style={{ color: getHealthColor(healthStatus) }}>
      {healthStatus}
    </span>
  );
}, (prevProps, nextProps) => {
  // Only re-render if pet ID or relevant properties change
  return (
    prevProps.pet.id === nextProps.pet.id &&
    prevProps.pet.kind === nextProps.pet.kind &&
    prevProps.pet.weight === nextProps.pet.weight &&
    prevProps.pet.height === nextProps.pet.height &&
    prevProps.pet.length === nextProps.pet.length
  );
});

Health.displayName = 'Health';
