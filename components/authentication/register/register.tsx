'use client'

import React, {useRef, useState} from 'react'
import FormControl from '../form-control/form-control'
import Link from 'next/link';
import ErrorMessage from '../error-message/error-message';
import FormGreetings from '../form-greetings/form-greetings';
import AuthBtn from '@/components/auth-btn/auth-btn';
import { useRouter } from 'next/navigation';
import { getURL } from '@/utils/utils';
import { createClient } from '@/utils/supabase/client';

interface FormProps {
    full_name: string;
    mobile_number: string;
    email: string;
    password: string;
    confirm_password: string;
    terms_n_condition: boolean
}

function Register() {
    const router = useRouter();
    const supabase = createClient();
    const [showTermsNotAccepted, setShowTermsNotAccepted] = useState<boolean>(false);
    const submitBtnRef = useRef<HTMLButtonElement>(null);
    const [formError, setFormError] = useState<{isShown: boolean, text: string}>({
        isShown: false, 
        text: "Password does not match"
    });
    const [form, setFormDetails] = useState<FormProps>({
        full_name: "",
        mobile_number: "",
        email: "",
        password: "",
        confirm_password: "",
        terms_n_condition: false
    });

    const updateForm = (event: any) => {
        const {id, value} = event.target;
        event.target.nextElementSibling?.classList.replace('visible', 'invisible');
        setFormDetails(prevDetails => {
            return {...prevDetails, [id]: value}
        })
    }

    const handleChecked = () => {
        setFormDetails(prevDetails => {
            return {...prevDetails, terms_n_condition: !prevDetails.terms_n_condition}
        })
    }

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        const inputs:  NodeListOf<HTMLInputElement> = document.querySelectorAll('#signup-form input:not([type="checkbox"])');
        inputs.forEach((item) => {
            if(item.value === ""){
                item.nextElementSibling?.classList.replace('invisible', 'visible');
            }
        })

        const {full_name, email, password, confirm_password, mobile_number, terms_n_condition} = form;
        if(full_name === "" || email === "" || password  === "" || confirm_password === "" || mobile_number === ""){
            return;
        }

        if(password.length < 6){
            setFormError({
                isShown: true, 
                text: "Password length can not be less than six"
            })
        }
        
        if(password !== confirm_password){
            setFormError({
                isShown: true, 
                text: "Password does not match"
            })
            console.log('error')
            return;
        }
        
        if(!terms_n_condition){
            setShowTermsNotAccepted(true);
            return;
        }
        submitBtnRef.current!.disabled = true;
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                    mobile_number,
                },
                emailRedirectTo: `${getURL()}dashboard/complete-registration`
            }
        })

        if(error){
            setFormError({
                isShown: true, 
                text: error?.message
            })
            submitBtnRef.current!.disabled = false;
            return;
        }

        const {error: userError} = await supabase
            .from("agents_table")
            .insert({full_name, phone_number: mobile_number, email, agent_id: data.user?.id})

        submitBtnRef.current!.disabled = false;

        if(!userError){
            console.log("/confirmation")
            router.push("/confirmation")
        }
    }

    return (
        <form action="" id='signup-form' className='max-w-sm mx-auto' onSubmit={handleSubmit}>
            <FormGreetings
                title='Set up your account'
                subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.'
            />
            <ErrorMessage formError={formError} />
            <div className='flex flex-col gap-1.5'>
                <FormControl
                    value={form.full_name}
                    handleChange ={updateForm}
                    placeholder='Full name'
                    id='full_name'
                />
                <FormControl
                    value={form.mobile_number}
                    handleChange ={updateForm}
                    placeholder='Mobile Number'
                    id='mobile_number'
                />
                <FormControl
                    value={form.email}
                    type='email'
                    handleChange ={updateForm}
                    placeholder='Email'
                    id='email'
                />
                <div className='grid grid-cols-2 gap-4'>
                    <FormControl
                        value={form.password}
                        type='password'
                        handleChange ={updateForm}
                        placeholder='Password'
                        id='password'
                    />
                    <FormControl
                        value={form.confirm_password}
                        type='password'
                        handleChange ={updateForm}
                        placeholder='Confirm Password'
                        id='confirm_password'
                    />
                </div>
            </div>
            <div className='flex pt-2 items-center gap-2'>
                <input 
                    type="checkbox"  
                    id="terms_n_condition"
                    checked= {form.terms_n_condition} 
                    onChange={handleChecked}
                />
                <label htmlFor="terms_n_condition" className='text-sm'>
                    Accept our <Link href="" className='text-orange hover:underline'>terms</Link> and <Link href="" className='text-orange hover:underline'>Condition</Link>
                </label>
            </div>
            <p className={` ${showTermsNotAccepted ? "visible" : "invisible"}`}>
                <i className='text-xs text-red-500'>Please accept our terms and condition</i>
            </p>
            <AuthBtn submitBtnRef={submitBtnRef} />
            <p className='text-sm  text-center mt-6'>Already have an account? <Link href="/login" className='text-orange font-medium hover:underline'>Sign in</Link></p>
        </form>
    )
}

export default Register