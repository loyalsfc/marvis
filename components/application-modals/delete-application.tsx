"use client"

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import ModalWrapper from '../modals/wrapper'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

function DeleteApplication({applicationId}:{applicationId: string}) {
    const supabase = createClient()
    const closeBtnRef = useRef<HTMLButtonElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const closeModal = () => {
        closeBtnRef.current?.click();
    }

    const deleteApplication = async() => {
        setIsLoading(true)

        const {error} = await supabase
            .from("property_applications")
            .delete()
            .eq("id", applicationId)

        if(!error){
            router.refresh();
            closeModal();
        }
    }

    return (
        <div>
            <ModalWrapper
                btnRef={closeBtnRef}
                modalTitle='Confirm Delete'
                btnText='Delete Application'
                btnClass='border-orange py-2.5 text-orange text-sm font-medium hover:bg-orange hover:text-white transition-all rounded-md px-4'
            >
                <div>
                    <h4 
                        className='text-primary text-lg font-semibold'
                    >
                        Are you sure you want to delete this application?
                    </h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-4'>
                        <Button 
                            onClick={deleteApplication}
                            disabled={isLoading} 
                            className='bg-red-600'
                        >
                            {isLoading ? <div className='h-4 w-4 border border-white border-t-grey-100 animate-spin' />
                            : "Confirm"}
                        </Button>
                        <Button
                            onClick={closeModal}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    )
}

export default DeleteApplication