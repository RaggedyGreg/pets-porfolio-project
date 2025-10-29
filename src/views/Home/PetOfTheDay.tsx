import { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { getCookie, setCookie } from "../../utils/utils";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

interface PetOfTheDayProps {
  maxPets: number;
}

const PET_OF_THE_DAY_STORAGE = "pet-of-the-day";

export const PetOfTheDay: FC<PetOfTheDayProps> = ({ maxPets }) => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const secondsUntilMidnight = ():number => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); 
    const difference = midnight.getTime() - now.getTime();
    return Math.floor(difference / 1000); 
  };

  useEffect(() => {
    if (maxPets > 0) {
      let cookieValue = getCookie(PET_OF_THE_DAY_STORAGE);
      if (!cookieValue) {
        cookieValue = String(Math.floor(Math.random() * maxPets));
        
        setCookie(PET_OF_THE_DAY_STORAGE, cookieValue, secondsUntilMidnight());
      } 
    }
  }, [maxPets]);

  const handleClick = () => { 
    navigate(`detail/${getCookie(PET_OF_THE_DAY_STORAGE)}`)
  }

  return (
    <Button variant="contained" onClick={handleClick}>{t("petToday.text")}</Button>
  );
};
