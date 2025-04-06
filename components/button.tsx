import { ButtonHTMLAttributes, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'px-4 py-1.5 rounded-lg hover:opacity-80 active:opacity-80 cursor-pointer flex flex-row items-center justify-center gap-1',
  variants: {
    color: {
      primary: 'bg-primary text-white',
    },
    flat: {
      true: 'bg-transparent',
    },
  },
  defaultVariants: {
    color: 'primary',
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
  };

const Button = ({
  className,
  children,
  color,
  flat,
  onClick,
  ...rest
}: ButtonProps & { className?: string }) => {
  const classes = button({ className, color, flat });
  return (
    <button onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
