'use client'

import { PropertyImagePreview } from '@/@types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import { FaStar, FaTrash, FaTrashAlt } from 'react-icons/fa'

interface Props {
    selectedFile: PropertyImagePreview[];
    selectedFunc: Dispatch<SetStateAction<PropertyImagePreview[]>>;
}

function PreviewImage({selectedFile, selectedFunc}: Props) {
    const supabase = createClientComponentClient();
    const removeImage = async(url: string) =>{    
        const { data, error } = await supabase
            .storage
            .from('property_images')
            .remove([url])
        if(data){
            selectedFunc(prevItem => {
                return prevItem.filter(item => item.url !== url)
            })
        }
    }

    const markFeaturedImage = (url: string) => {
        selectedFunc(prevItem => {
            return(
                prevItem.map(item => {
                    if(item.url === url){
                        return{...item, isMarkedFeatured: true}
                    } else {
                        return {...item, isMarkedFeatured: false};
                    }
                })
            )
        })
    }

    const displayImage = (path: string): string => {
        const { data} = supabase
            .storage
            .from('property_images')
            .getPublicUrl(path)
        return data.publicUrl
    }

    return (
        <div className='pb-4 flex items-center gap-2.5 overflow-scroll no-scrollbar flex-wrap w-full'>
            {selectedFile.map((item, index) =>{
              return(
                <div key={index} className='relative h-[100px] w-[150px] overflow-hidden shrink-0'>
                    <div className='absolute top-0 p-1 left-0 flex justify-between w-full z-10'>
                        <button 
                            type='button' 
                            className={`image-preview-btn ${item.isMarkedFeatured && "text-yellow-500"}`}
                            onClick={()=>markFeaturedImage(item.url)}
                        >
                            <FaStar/>
                        </button>
                        <button 
                            type='button' 
                            className='image-preview-btn'
                            onClick={()=>removeImage(item.url)}
                        >
                            <FaTrash/>
                        </button>
                    </div>
                    <Image
                        fill
                        src={displayImage(item.url)}
                        alt='Image preview'
                        className=' object-cover overflow-hidden'
                    />
                </div>
                )
            })}  
        </div>
    )
}
             

export default PreviewImage