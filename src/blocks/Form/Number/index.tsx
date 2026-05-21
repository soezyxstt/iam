import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Label
        className="text-white/80 font-display text-[11px] uppercase tracking-wider font-bold mb-2 block"
        htmlFor={name}
      >
        {label}

        {required && (
          <span className="text-brand-gold ml-1">
            * <span className="sr-only">(wajib)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="number"
        className="h-12 bg-white/5 border-white/10 focus-visible:ring-brand-gold/30 focus-visible:border-brand-gold/50 text-white placeholder:text-white/30 rounded-xl"
        {...register(name, { required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
