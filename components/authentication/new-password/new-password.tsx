"use client"

import React, { ChangeEventHandler, FormEvent, useEffect, useRef, useState } from 'react'
import FormGreetings from '../form-greetings/form-greetings'
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

    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event == "PASSWORD_RECOVERY") {
            const newPassword = prompt("What would you like your new password to be?");
            const { data, error } = await supabase.auth
              .updateUser({ password: formData.newPassword })
     
            if (data) alert("Password updated successfully!")
            if (error) alert("There was an error updating your password.")
          }
        })
      }, [])

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
            router.push("/login");
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
        <form onSubmit={handleSubmit} id='reset-form' className="max-w-md p-4 shadow-lg rounded-md space-y-4">
            <FormGreetings
                title='Reset Password'
                subtitle='Enter your email address to reset password'
            />
            <FormControl
                value={formData.newPassword}
                type='password'
                handleChange ={handleChange}
                placeholder='Enter New Password'
                id='email'
            />
            <FormControl
                value={formData.ConfirmNewPassword}
                type='password'
                handleChange ={handleChange}
                placeholder='Confirm Password'
                id='confirmEmail'
            />
            <AuthBtn submitBtnRef={submitBtnRef} />
        </form>
    )
}

export default NewPassword