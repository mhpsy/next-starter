'use client'

import type { FieldValues, Path } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface FormCheckboxProps<T extends FieldValues> {
  control: any
  name: Path<T>
  label: string
  className?: string
}

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  className,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem
          className={`space-x-3 space-y-0 rounded-md border cursor-pointer p-3 shadow-sm ${fieldState.invalid ? 'border-red-500' : ''} ${className || ''}`}
          onClick={(e) => {
            // click this item box can select checkbox
            // need skip if click on checkbox or label
            const checkbox = e.currentTarget.querySelector('input[type="checkbox"]')
            if (checkbox && (checkbox === e.target || checkbox.contains(e.target as Node))) {
              return
            }
            const label = e.currentTarget.querySelector('label')
            if (label && (label === e.target || label.contains(e.target as Node))) {
              return
            }
            field.onChange(!field.value)
          }}
        >
          <div className="flex flex-row items-center ">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            </FormControl>
            <div className="space-y-1 leading-none ml-2">
              <FormLabel className="text-sm">
                {label}
              </FormLabel>
            </div>
          </div>
          <FormMessage className="text-sm font-medium text-red-500" />
        </FormItem>
      )}
    />
  )
}
