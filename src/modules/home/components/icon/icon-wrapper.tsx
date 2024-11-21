import { type MaterialIconComponent, type IconComponent } from '../../types/icon.type';

type IconWrapperProps = {
  icon: IconComponent;
  size?: number;
};

export function IconWrapper({ icon: Icon, size = 20 }: IconWrapperProps) {
  if (isMaterialIcon(Icon)) {
    return <Icon sx={{ fontSize: `${size}px` }} />;
  }

  return <Icon size={size + 5} />;
}

function isMaterialIcon(icon: IconComponent): boolean {
  return (icon as MaterialIconComponent).muiName !== undefined;
}
