import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

const appTheme = createTheme({}, ruRU);

type AppTheme = typeof appTheme;

export type { AppTheme };
export { appTheme };
