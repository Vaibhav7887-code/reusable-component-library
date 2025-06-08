import * as React from 'react';
import { cn } from '@/lib/utils';

interface SimpleScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SimpleScrollArea = React.forwardRef<HTMLDivElement, SimpleScrollAreaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-grow overflow-auto', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SimpleScrollArea.displayName = 'SimpleScrollArea'; 