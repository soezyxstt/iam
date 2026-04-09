import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/utilities/ui'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full font-display font-semibold tracking-wider ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md',
        secondary: 'bg-brand-gold text-brand-dark hover:bg-brand-gold/90 shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-brand-primary/40 bg-transparent text-brand-primary hover:bg-brand-primary/10',
        ghost: 'text-brand-primary hover:bg-brand-primary/10',
        link: 'text-primary underline-offset-4 hover:underline',
        clear: 'bg-transparent text-foreground hover:bg-foreground/5', // Preserved for Payload Link compatibility
        brandRed: 'bg-[var(--brand-accent-red)] text-white hover:bg-[var(--brand-accent-red)]/90', // Explicit custom variant
        brandYellow:
          'bg-[var(--brand-gold)] text-[var(--brand-dark-blue)] hover:bg-[var(--brand-gold)]/80', // Explicit custom variant
        default: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-md',
      },
      size: {
        md: 'px-7 py-3 text-xs',
        sm: 'px-5 py-2 text-[11px]',
        lg: 'px-9 py-4 text-sm',
        default: 'px-7 py-3 text-xs',
        icon: 'h-10 w-10',
        clear: '', // Preserved for Payload Link compatibility
      },
      scaleOnHover: {
        true: 'hover:scale-105',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      scaleOnHover: true,
    },
  },
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  asChild?: boolean
  href?: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {}

export interface ButtonLinkProps
  extends Omit<React.ComponentProps<typeof Link>, 'className'>,
    ButtonBaseProps {
  href: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, scaleOnHover, asChild = false, href, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, scaleOnHover, className }))}
          {...(props as Omit<ButtonLinkProps, 'href' | 'className'>)}
        />
      )
    }

    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, scaleOnHover, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
