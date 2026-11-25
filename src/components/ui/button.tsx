import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly isLoading?: boolean;
  readonly fullWidth?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-obsidian text-ivory border border-obsidian hover:bg-espresso hover:border-espresso active:bg-obsidian',
  secondary:
    'bg-champagne text-obsidian border border-champagne hover:bg-[#ddd1c1] hover:border-[#ddd1c1]',
  outline: 'bg-transparent text-obsidian border border-obsidian hover:bg-obsidian hover:text-ivory',
  ghost: 'bg-transparent text-obsidian border border-transparent hover:bg-champagne/50',
  link: 'bg-transparent text-obsidian border-b border-obsidian/50 hover:border-obsidian px-0 py-0.5 rounded-none',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-[11px] tracking-[0.18em]',
  md: 'h-11 px-7 text-xs tracking-[0.2em]',
  lg: 'h-13 px-9 text-xs tracking-[0.22em]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const isLink = variant === 'link';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-none font-sans font-medium uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45',
        VARIANT_CLASSES[variant],
        !isLink && SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
