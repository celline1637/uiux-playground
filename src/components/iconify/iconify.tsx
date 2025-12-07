import { Icon } from '@iconify/react';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

export interface IconifyProps {
  icon: string;
  width?: number | string;
  className?: string;
  sx?: React.CSSProperties;
}

export const Iconify = forwardRef<SVGSVGElement, IconifyProps>(
  ({ icon, width = 24, className, sx, ...other }, ref) => (
    <Icon
      ref={ref}
      icon={icon}
      width={width}
      className={className}
      style={sx}
      {...other}
    />
  )
);

Iconify.displayName = 'Iconify';

