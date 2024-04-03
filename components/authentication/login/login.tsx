'use client'

import React, { FormEvent, useRef, useState } from 'react'
import FormGreetings from '../form-greetings/form-greetings'
import ErrorMessage from '../error-message/error-message'
import FormControl from '../form-control/form-control';
import AuthBtn from '@/components/auth-btn/auth-btn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { login } from '@/lib/features/user/user';
import { createClient } from '@/utils/supabase/client';

function Login() {
  const dispatch = useAppDispatch()
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const [formdata, setFormData] = useState<{email: string, password: string}>({
    email: "",
    password: ""
  });
  const [formError, setFormError] = useState<{isShown: boolean, text: string}>({
    isShown: false, 
    text: "Password does not match"
  });
  const supabase = createClient();
  const router = useRouter();

  const updateForm = (event: any) => {
    const {id, value} = event.target;
    event.target.nextElementSibling?.classList.replace('visible', 'invisible');
    setFormError(prevState => {
      return {...prevState, isShown: false}
    })
    setFormData(prevDetails => {
        return {...prevDetails, [id]: value}
    })
}

const handleSubmit = async(e: FormEvent) => {
  e.preventDefault();
  const inputs:  NodeListOf<HTMLInputElement> = document.querySelectorAll('#login-form input');
  inputs.forEach((item) => {
      if(item.value === ""){
          item.nextElementSibling?.classList.replace('invisible', 'visible');
      }
  })

  const {email, password} = formdata;
  if( email === "" || password  === "" ){
    return;
  }

  submitBtnRef.current!.disabled = true;
  
  const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
  })
  submitBtnRef.current!.disabled = false;
  if(data.user){
    dispatch(login(data.user));
    router.push("/dashboard");
  }

  if(error){
    setFormError({
      isShown: true, 
      text: error?.message
    })
  }
}

  return (
    <form className='max-w-sm mx-auto' id='login-form' onSubmit={handleSubmit}>
      <FormGreetings
        title='Welcome Back'
        subtitle='Please login into your account'
      />
      <ErrorMessage 
        formError={formError}
      />
      <FormControl
          value={formdata.email}
          type='email'
          handleChange ={updateForm}
          placeholder='Email'
          id='email'
      />
      <Link href="/forget-password" className='block hover:text-orange text-xs text-end italic'>Forget Password?</Link>
      <FormControl
          value={formdata.password}
          type='password'
          handleChange ={updateForm}
          placeholder='Password'
          id='password'
      />
      <AuthBtn submitBtnRef={submitBtnRef} />
      <p className='text-sm  text-center mt-6'>Don&apos;t have an account yet? <Link href="/register" className='text-orange font-medium hover:underline'>Sign Up</Link></p>
    </form>
  )
}

export default Login