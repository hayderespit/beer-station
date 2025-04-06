import { ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'px-4 py-1.5 rounded-lg hover:opacity-80 active:opacity-80 cursor-pointer flex flex-row items-center justify-center gap-1',
  variants: {
    color: {
      primary: 'bg-primary text-white',
      neutral: 'bg-zinc-500 text-black dark:text-white',
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
    {
      color: 'neutral',
      flat: true,
      class: 'bg-zinc-500/20',
    },
  ],
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants & {
  children: ReactNode;
};

const Button = ({ className, ...props }: ButtonProps & { className?: string }) => {
  return <button className={button({ className, ...props })}>{props.children}</button>;
};

export default Button;
