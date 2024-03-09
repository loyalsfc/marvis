"use client"

import React, { FormEvent, useRef, useState } from 'react'
import FormControl from '../form-control/form-control'
import AuthBtn from '@/components/auth-btn/auth-btn'
import { supabase } from '@/utils/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function NewPassword() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        newPassword: "",
        ConfirmNewPassword: ""
    });
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const inputs:  NodeListOf<HTMLInputElement> = document.querySelectorAll('#reset-form input:not([type="checkbox"])');
        inputs.forEach((item) => {
            if(item.value === ""){
                item.nextElementSibling?.classList.replace('invisible', 'visible');
            }
        })

        if( formData.newPassword === "" || formData.ConfirmNewPassword === ""){
            return;
        }

        submitBtnRef.current!.disabled = true;
        
        const { data, error } = await supabase.auth.updateUser({
            password: formData.newPassword
        })

        if(!error){
            toast.success("Password reset successful")
            router.push("/dashboard");
        } else {
            toast.error(error.message);
        }
        submitBtnRef.current!.disabled = false;
    }

    const handleChange = (e: any) => {
        const {id, value} = e.target;
        setFormData(prevState => {
            return {...prevState, [id]: value}
        })
    }

    return (
        <form onSubmit={handleSubmit} id='reset-form' className="space-y-4">
            <FormControl
                value={formData.newPassword}
                type='password'
                handleChange ={handleChange}
                placeholder='Enter New Password'
                id='newPassword'
            />
            <FormControl
                value={formData.ConfirmNewPassword}
                type='password'
                handleChange ={handleChange}
                placeholder='Confirm New Password'
                id='ConfirmNewPassword'
            />
            <AuthBtn submitBtnRef={submitBtnRef} />
        </form>
    )
}

export default NewPassword