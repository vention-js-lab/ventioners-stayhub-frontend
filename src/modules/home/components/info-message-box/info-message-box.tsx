import Box from '@mui/material/Box';
import { infoMessageBoxStyles } from './info-message-box.styles';

export function InfoMessageBox({ children }: { children: React.ReactNode }) {
  return <Box sx={infoMessageBoxStyles.container}>{children}</Box>;
}
