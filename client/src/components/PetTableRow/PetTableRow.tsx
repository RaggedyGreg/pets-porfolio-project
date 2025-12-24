import React, { memo } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Pet } from '../../interfaces/interfaces';
import { chooseImage } from '../../utils/utils';
import { notFound } from '../../icons/icons';
import { Health } from '../Health/Health';
import { useTranslation } from 'react-i18next';

interface PetTableRowProps {
  pet: Pet;
  onRowClick: (id: number) => void;
}

export const PetTableRow: React.FC<PetTableRowProps> = memo(({ pet, onRowClick }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onRowClick(pet.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onRowClick(pet.id);
    }
  };

  return (
    <TableRow
      hover
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyPress={handleKeyPress}
      aria-label={t('home.table.rowAria', 'View details for {{name}}', { name: pet.name })}
    >
      <TableCell component="th" scope="row">
        {pet.name}
      </TableCell>
      <TableCell align="right">
        <img
          height={40}
          src={chooseImage(pet.kind)}
          alt={t('home.table.kindIcon', '{{kind}} icon', { kind: pet.kind })}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = notFound;
          }}
        />
      </TableCell>
      <TableCell align="right">{pet.weight}</TableCell>
      <TableCell align="right">{pet.height}</TableCell>
      <TableCell align="right">{pet.length}</TableCell>
      <TableCell align="right" data-testid="health">
        <Health pet={pet} />
      </TableCell>
    </TableRow>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the pet data changes
  return (
    prevProps.pet.id === nextProps.pet.id &&
    prevProps.pet.name === nextProps.pet.name &&
    prevProps.pet.weight === nextProps.pet.weight &&
    prevProps.pet.height === nextProps.pet.height &&
    prevProps.pet.length === nextProps.pet.length &&
    prevProps.pet.kind === nextProps.pet.kind
  );
});

PetTableRow.displayName = 'PetTableRow';
