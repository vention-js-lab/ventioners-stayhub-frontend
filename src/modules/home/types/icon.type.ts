import { type SvgIconProps } from '@mui/material';
import { type IconBaseProps } from 'react-icons';

export type ReactIconComponent = React.ComponentType<IconBaseProps>;

export type MaterialIconComponent = React.ComponentType<SvgIconProps> & {
  muiName?: string;
};

export type IconComponent = MaterialIconComponent | ReactIconComponent;
