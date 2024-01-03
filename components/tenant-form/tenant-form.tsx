'use client'

import React, { ChangeEventHandler, useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ZodTemplate, { ZodTemplateTextarea } from './zod-template/zod-template'
import ImagePreview from '../property-form/image-preview/image-preview'
import Divider from '../divider/divider'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { downloadImage, supabase } from '@/utils/utils'
import { FaTrash } from 'react-icons/fa'
import { useAppSelector } from '@/lib/hooks/hooks'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    full_name: z.string().min(2,{
        message: "Name can not be less than 2 characters"
    }).max(50),
    phone_number: z.string().min(10,{
        message: "Phone Number can not be less than 10 characters"
    }).max(14,{
        message: "Phone Number can not be more than 14 characters"
    }),
    email_address: z.string().email().min(5),
    contact_address: z.string()
        .min(10, {
            message: "Address must be at least 10 characters.",
        })
        .max(160, {
            message: "Address must not be longer than 30 characters.",
        }),
    guarantor_name: z.string().min(2,{
        message: "Name can not be less than 2 characters"
    }).max(50),
    garantor_phone_number: z.string().min(10,{
        message: "Phone Number can not be less than 10 characters"
    }).max(14,{
        message: "Phone Number can not be more than 14 characters"
    }),
    guarantor_address: z.string()
    .min(10, {
        message: "Address must be at least 10 characters.",
    })
    .max(160, {
        message: "Address must not be longer than 30 characters.",
    }),
    
})

function TenantForm() {
    const [avatar, setAvatar] = useState<string>("public/avatar.png");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [userIdentification, setUserIdentification] = useState<string>("cards/default_card.svg");
    const userId = useAppSelector(state => state.user.user?.id);
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            phone_number: "",
        },
    })
    const updateAvatar = (path: string) => {
        setAvatar(path)
    }

    const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            // setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `cards/${'uid'}-${Math.random()}.${fileExt}`
        
            const { error: uploadError } = await supabase.storage.from('identity_cards').upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // onUpload(filePath)
            setUserIdentification(filePath)
        } catch (error) {
            alert('Error uploading avatar!')
        } finally {
            // setUploading(false)
        }
    }

    const deleteImage = async() => {
        const { data, error } = await supabase
            .storage
            .from('identity_cards')
            .remove([userIdentification]);
        if(data){
            setUserIdentification("cards/default_card.svg");
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        setIsSubmitting(true);
        // ✅ This will be type-safe and validated.
        const {data, error} = await supabase.from("tenants")
            .insert({
                ...values, 
                id_card: userIdentification,
                avatar,
                agent_id: userId
            })
        if(!error){
            router.push("/all-properties")
        }
    }
      
  return (
    <Form {...form}>
        <ImagePreview
            imagePath={avatar}
            manageEdit={updateAvatar}
        />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ZodTemplate
                form={form}
                name="full_name"
                label="Full Name"
                placeholder="John Doe"
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
                    name="email_address"
                    label="Email"
                    type='email'
                    placeholder="user@example.com"
                />
            </div>
            <ZodTemplateTextarea
                form={form}
                name="contact_address"
                label="Contact Address"
                placeholder="Enter your contact address"
            />
            <Divider note="Guarantors Information"/>
            <div className='space-y-4'>
                <ZodTemplate
                    form={form}
                    name="guarantor_name"
                    label="Guarantor Name"
                    placeholder="John Doe"
                />
                <ZodTemplate
                    form={form}
                    name="garantor_phone_number"
                    label="Guarantor Phone No"
                    placeholder="081041234567"
                />
                <ZodTemplateTextarea
                    form={form}
                    name="guarantor_address"
                    label="Guarantor Contact Address"
                    placeholder="Enter your contact address"
                />
            </div>
            <Divider note="Means of Identification"/>
            <div>
                <h4 className='text-center mx-auto max-w-md'>Upload a scanned copy the tenant ID in one of this format <span className='font-bold'>PNG</span>, <span className='font-bold'>JPEG</span> or <span className='font-bold'>SVG</span></h4>
                <div className="max-w-[450px] mx-auto my-8 relative">
                    {userIdentification !== "cards/default_card.svg" && <button 
                        type='button' 
                        className='image-preview-btn absolute top-2 right-2 z-10'
                        onClick={deleteImage}
                    >
                        <FaTrash/>
                    </button>}
                    <AspectRatio ratio={3.375 / 2.125}>
                        <Image src={downloadImage(userIdentification, "identity_cards")} fill alt="Image" className="rounded-md object-cover" />
                    </AspectRatio>
                </div>
                <div>
                    <input type="file" onChange={uploadAvatar} name="upload-id" id="upload-id" className='hidden' accept='image/*' />
                    <label htmlFor="upload-id" className='btn btn-primary w-fit mx-auto'>Upload Tenant ID</label>
                </div>
            </div>
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

export default TenantForm