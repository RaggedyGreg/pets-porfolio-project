import React, { memo } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = memo(() => {
  const { mode, toggleColorMode } = useThemeContext();
  const { t } = useTranslation();

  return (
    <Tooltip 
      title={mode === 'dark' 
        ? t('theme.switchToLight', 'Switch to light mode') 
        : t('theme.switchToDark', 'Switch to dark mode')
      }
    >
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
