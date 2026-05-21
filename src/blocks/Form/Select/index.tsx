import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, options, required, width, defaultValue }) => {
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
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find((t) => t.value === value)

          return (
            <SelectComponent onValueChange={(val) => onChange(val)} value={controlledValue?.value}>
              <SelectTrigger
                className="h-12 bg-white/5 border-white/10 focus:ring-brand-gold/30 focus:border-brand-gold/50 text-white data-[placeholder]:text-white/30 w-full rounded-xl"
                id={name}
              >
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </SelectComponent>
          )
        }}
        rules={{ required }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
