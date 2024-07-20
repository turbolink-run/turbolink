import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export interface PagePlaceholderProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pagePlaceholderVariants> {
  children: React.ReactNode;
}

const pagePlaceholderVariants = cva(
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

export default function PagePlaceholder({
  size,
  className,
  children,
  ...props
}: PagePlaceholderProps) {
  return (
    <span
      className={cn(pagePlaceholderVariants({ size, className }))}
      {...props}
    >
      {children}
    </span>
  );
}
