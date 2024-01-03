import React, { ReactNode } from 'react'

interface Prop{
    type?: string;
    value: string;
    handleChange: (e: any)=>void;
    placeholder?: string;
    id: string;
    className?: string;
    label?: string;
    children?:ReactNode
}

interface Wrapper{
    id:string, 
    label: string | undefined, 
    children:ReactNode
}

function InputWrapper({id, label, children}:Wrapper){
    return(
        <div>
            <label htmlFor={id} className='text-[15px] font-medium block mb-1'>{label}</label>
            {children}    
            <i className='invisible text-[10px] leading-none text-red-500'>Please enter a valid {id.replace("_", " ")}</i>
        </div>
    )
}

function FormControl({type, value, handleChange, placeholder, id, className, label}:Prop) {
    return (
        <InputWrapper id={id} label={label}>
            <input 
                type={type ?? 'text'}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                id={id}
                className={`form-control ${className}`}
            />
        </InputWrapper>
    )
}

export function FormTextArea({type, value, handleChange, placeholder, id, className, label}:Prop) {
    return (
        <InputWrapper id={id} label={label}>
            <textarea
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                id={id}
                className={`form-control ${className}`}
            />
        </InputWrapper>
    )
}

export function FormSelect({value, handleChange, placeholder, id, className, label, children}:Prop) {
    return (
        <InputWrapper id={id} label={label}>
            <select
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                id={id}
                className={`form-control ${className}`}
            >
                {children}
            </select>
        </InputWrapper>
    )
}

export default FormControl