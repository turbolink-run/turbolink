import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface MagicTitleProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof magicTitleVariants> {
  children: React.ReactNode;
}

const magicTitleVariants = cva(
  'animate-gradient-x bg-gradient-to-r from-purple-500 via-red-500 to-amber-500 bg-clip-text font-extrabold text-transparent',
  {
    variants: {
      size: {
        small: ['text-base', 'leading-[1.5rem]'],
        medium: ['text-2xl', 'leading-[2rem]'],
        large: ['text-6xl', 'leading-[5rem]'],
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export default function MagicTitle({
  size,
  className,
  children,
  ...props
}: MagicTitleProps) {
  return (
    <span className={cn(magicTitleVariants({ size, className }))} {...props}>
      {children}
    </span>
  );
}
