import type { AccommodationBasics } from '#/modules/host/types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { numberSelectorStyles } from '../../styles/accommodation/number-selector.styles';

export interface NumberSelectorProps {
  field: keyof AccommodationBasics;
  label: string;
  basics: AccommodationBasics;
  handleChange: (field: keyof AccommodationBasics, value: number) => void;
}

export function NumberSelector({ field, label, basics, handleChange }: NumberSelectorProps) {
  return (
    <div style={numberSelectorStyles.numberSelector}>
      <Typography variant="body1" sx={numberSelectorStyles.label}>
        {label}
      </Typography>
      <Button variant="outlined" onClick={() => handleChange(field, basics[field] - 1)} sx={numberSelectorStyles.button}>
        <RemoveIcon />
      </Button>
      <Typography variant="body1" sx={numberSelectorStyles.value}>
        {basics[field]}
      </Typography>
      <Button variant="outlined" onClick={() => handleChange(field, basics[field] + 1)} sx={numberSelectorStyles.button}>
        <AddIcon />
      </Button>
    </div>
  );
}
