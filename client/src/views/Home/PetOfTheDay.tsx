import { FC, useEffect } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import { Pets as PetsIcon } from "@mui/icons-material";
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
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #1a7f5a 0%, #2d9a71 100%)',
        color: 'white',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <PetsIcon sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {t("petToday.title", "Pet of the Day")}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {t("petToday.subtitle", "Discover a new friend today!")}
          </Typography>
        </Box>
      </Box>
      <Button 
        variant="contained" 
        onClick={handleClick}
        sx={{ 
          backgroundColor: 'white',
          color: '#1a7f5a',
          fontWeight: 600,
          px: 3,
          '&:hover': {
            backgroundColor: '#f0f9f6',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
          },
          transition: 'all 0.2s ease-in-out'
        }}
      >
        {t("petToday.action", "View Pet")}
      </Button>
    </Paper>
  );
};
