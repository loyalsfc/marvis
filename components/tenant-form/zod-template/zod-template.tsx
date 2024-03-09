import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'

interface Props{
    form: any,
    name: string,
    label:string,
    type?:string,
    placeholder: string,
    disable?: boolean
}

export function ZodTemplateTextarea({
    form,
    name,
    label,
    placeholder
}:Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <textarea
                            placeholder={placeholder}
                            className="resize-none form-control"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

function ZodTemplate({
    form,
    name,
    label,
    type,
    placeholder,
    disable
}:Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            disabled={disable}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <input 
                            type={type ?? 'text'} 
                            placeholder={placeholder} 
                            className='form-control disabled:bg-muted disabled:cursor-not-allowed disabled:border-muted' 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default ZodTemplate