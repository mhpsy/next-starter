'use client'

import type { useTranslations } from 'next-intl'
import type { FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface FormInputProps<T extends FieldValues> {
  control: any
  name: Path<T>
  label: string
  placeholder?: string
  description?: string
  type?: string
  className?: string
  t?: ReturnType<typeof useTranslations>
  tv?: any
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  className,
  t,
  tv = undefined,
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              className={`transition-all focus:ring-2 focus:ring-offset-1 ${className || ''}`}
              placeholder={placeholder}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-xs">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-sm font-medium text-red-500" t={t} tv={tv} />
        </FormItem>
      )}
    />
  )
}
