import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: ' text-primary-foreground ',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-primary-movieColor bg-background-main text-primary-white hover:bg-primary-movieColor hover:font-bold hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        home_btn:
          'bg-primary-movieColor border-2 border-primary-movieColor text-primary-white p-0 xs:text-xl sm:text-2xl lg:text-3xl flex items-center xs:px-5 xs:py-4 sm:px-6 md:px-8 rounded-lg py-5 gap-1 opacity-80 hover:bg-transparent hover:text-primary-movieColor hover:border-2 hover:border-primary-movieColor ',
        home_outline:
          'text-primary-white border-2 border-primary-movieColor md:px-8 sm:px-6 xs:px-5 xs:py-4 xs:text-xl py-5 flex items-center sm:text-2xl lg:text-3xl rounded-lg bg-transparent hover:opacity-70',
        normal:
          'bg-primary-movieColor border-2 border-primary-movieColor text-primary-white p-0 xs:text-xl sm:text-2xl lg:text-2xl flex items-center xs:px-5 xs:py-4 sm:px-6 md:px-8 rounded-lg py-5 gap-1 opacity-80 hover:bg-transparent hover:text-primary-movieColor hover:border-2 hover:border-primary-movieColor ',
        ghost: 'hover:bg-accent hover:text-accent-foreground ',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'text-xl px-4 py-2',
        sm: 'text-xl h-9 rounded-md px-3',
        profile: 'text-[15px] font-semibold h-9 rounded-xl px-7 py-8',
        md: 'text-2xl h-11 rounded-md px-8 py-7',
        lg: 'text-2xl rounded-md px-8 py-7',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
