import { type SxProps, type Theme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

interface MenuItemLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function MenuItemLink({ to, onClick, children, sx }: MenuItemLinkProps) {
  return (
    <MenuItem component={Link} to={to} onClick={onClick} sx={sx}>
      {children}
    </MenuItem>
  );
}
