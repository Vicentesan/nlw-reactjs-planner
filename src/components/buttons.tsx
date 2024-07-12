import type React from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg px-5 font-medium transition-colors duration-200',

  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
    },
    size: {
      default: 'py-2',
      full: 'h-11 w-full',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  )
}
