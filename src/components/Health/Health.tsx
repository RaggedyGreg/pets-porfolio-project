import { FC } from "react";
import { Pet } from "../../interfaces/interfaces";
import variables from "../../scss/variables.module.scss";
import { Box, Typography } from "@mui/material";

interface HealthProps {
  pet: Pet;
}

export const Health: FC<HealthProps> = ({ pet }) => {
  let health = pet.weight / (pet.height * pet.length);
  let healthText = "";
  let healthColor = "";

  if (
    (pet.kind === "cat" && pet.number_of_lives === 1) ||
    health < 2 ||
    health > 5
  ) {
    healthText = "unhealthy";
    healthColor = variables.healthUnhealthy;
  } else if (health >= 2 && health <= 3) {
    healthText = "very healthy";
    healthColor = variables.healthVeryHealthy;
  } else if (health >= 3 || health <= 5) {
    healthText = "healthy";
    healthColor = variables.healthHealthy;
  }
  return <span style={{ color: healthColor }}>{healthText}</span>;
};
