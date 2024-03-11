'use client'

import React, { useState } from 'react'
import ImagePreview from '../property-form/image-preview/image-preview';
import { AgentDetails } from '@/@types';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ZodTemplate, { ZodTemplateTextarea } from '../tenant-form/zod-template/zod-template';
import { supabase } from '@/utils/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const FormSchema = z.object({
    full_name: z.string().min(2,{
        message: "Name can not be less than 2 characters"
    }).max(50),
    agency_name: z.string().min(2,{
        message: "Agency name can not be less than 2 characters"
    }).max(50),
    phone_number: z.string().min(10,{
        message: "Phone Number can not be less than 10 characters"
    }).max(14,{
        message: "Phone Number can not be more than 14 characters"
    }),
    email: z.string().email().min(5).optional(),
    home_address: z.string()
        .min(10, {
            message: "Address must be at least 10 characters.",
        })
        .max(160, {
            message: "Address must not be longer than 30 characters.",
        }),
    office_address: z.string()
        .min(10, {
            message: "Address must be at least 10 characters.",
        })
        .max(160, {
            message: "Address must not be longer than 30 characters.",
        }),
})

function Settings({
    data
}:{
    data: AgentDetails
}) {
    const [avatar, setAvatar] = useState<string>(data?.profile_image ?? "public/avatar.png");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            full_name: data.full_name,
            agency_name: data.agency_name,
            phone_number: data.phone_number,
            email: data.email,
            home_address: data.home_address,
            office_address: data.office_address
        },
    })

    const updateAvatar = (path: string) => {
        setAvatar(path)
    }

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setIsSubmitting(true);
        const {
            full_name,
            agency_name,
            phone_number,
            home_address,
            office_address,
        } = values;

        const {error} = await supabase
            .from("agents_table")
            .update({full_name,
                agency_name,
                phone_number,
                home_address,
                office_address,
                profile_image: avatar,
                profile_updated: true,
            })
            .eq("id", data.id)

        if(error) {
            toast.error(error.message)
        } else {
            toast.success("Profile Update Successful");
            router.push("/dashboard");
        }

        setIsSubmitting(false);
    }

    return (
        <Form {...form}>
            <ImagePreview
                imagePath={avatar}
                manageEdit={updateAvatar}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
                <ZodTemplate
                    form={form}
                    name="full_name"
                    label="Full Name"
                    placeholder="John Doe"
                />
                <ZodTemplate
                    form={form}
                    name="agency_name"
                    label="Agency Name"
                    placeholder="John Doe & Sons"
                />
                <div className='grid grid-cols-2 gap-8'>
                    <ZodTemplate
                        form={form}
                        name="phone_number"
                        label="Phone No"
                        placeholder="081041234567"
                    />
                    <ZodTemplate
                        form={form}
                        name="email"
                        label="Email"
                        type='email'
                        placeholder="user@example.com"
                        disable={true}
                    />
                </div>
                <ZodTemplateTextarea
                    form={form}
                    name="home_address"
                    label="Home Address"
                    placeholder="Enter your Home Address"
                />
                <ZodTemplateTextarea
                    form={form}
                    name="office_address"
                    label="Office Address"
                    placeholder="Enter your Office Address"
                />
                <button 
                    className='btn btn-secondary ml-auto border border-orange rounded-md hover:bg-orange hover:text-white transition-all'
                    disabled={isSubmitting}
                >
                    {isSubmitting && <div className='loader' />}
                    Submit{isSubmitting && "ting..."}
                </button>
            </form>
        </Form>
    )
}

export default Settings