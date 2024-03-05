"use client"

import React, { FormEvent, useRef, useState } from 'react'
import FormGreetings from '../form-greetings/form-greetings'
import FormControl from '../form-control/form-control'
import AuthBtn from '@/components/auth-btn/auth-btn'
import Link from 'next/link';
import { supabase } from '@/utils/utils'
import { toast } from 'react-toastify'

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if( email === "" ){
            const input = document.querySelector('input');
            input?.nextElementSibling?.classList.replace('invisible', 'visible');
            return;
        }

        submitBtnRef.current!.disabled = true;
        console.log(email)
        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://example.com/update-password'
        })

        if(!error){
            toast.success("Password reset links sent")
        } else {
            toast.error(error.message);
        }
        submitBtnRef.current!.disabled = false;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-4 shadow-md rounded-md space-y-4">
            <FormGreetings
                title='Reset Password'
                subtitle='Enter your email address to reset password'
            />
            <FormControl
                value={email}
                type='email'
                handleChange ={(e)=>setEmail(e.target.value)}
                placeholder='johndoe@gmail.com'
                id='email'
            />
            <AuthBtn submitBtnRef={submitBtnRef} />
            <p 
                className='text-sm  text-center mt-6'
            >
                Go back to <Link href="/login" className='text-orange font-medium hover:underline'>Login</Link>
            </p>
        </form>
    )
}

export default ForgetPassword