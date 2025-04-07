import { ButtonHTMLAttributes, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'min-w-min px-4 py-1.5 rounded-lg hover:opacity-80 active:opacity-80 cursor-pointer relative',
  variants: {
    color: {
      primary: 'bg-primary text-white',
    },
    flat: {
      true: 'bg-transparent',
    },
    size: {
      small: 'px-2 py-1 text-sm',
      medium: 'px-4 py-1.5 text-base',
      large: 'px-6 py-2 text-lg',
    },
    loading: {
      true: 'opacity-70 cursor-not-allowed',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
  compoundVariants: [
    {
      color: 'primary',
      flat: true,
      class: 'bg-primary/40',
    },
  ],
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    loading?: boolean;
  };

const Button = ({
  className,
  children,
  color,
  flat,
  size,
  onClick,
  loading,
  disabled,
  ...rest
}: ButtonProps & { className?: string }) => {
  const classes = button({ className, color, flat, size, loading });

  return (
    <button onClick={onClick} className={classes} disabled={disabled || loading} {...rest}>
      <span
        className={`flex flex-row items-center justify-center gap-1 ${loading ? 'invisible' : ''}`}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
        </span>
      )}
    </button>
  );
};

export default Button;
