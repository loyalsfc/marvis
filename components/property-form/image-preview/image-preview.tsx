import { downloadImage, supabase } from '@/utils/utils'
import Image from 'next/image'
import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react'

interface Props{
    imagePath:string;
    manageEdit: (path: string) => void
}

function ImagePreview({imagePath, manageEdit}:Props) {

    const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
            // setUploading(true)

        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `public/${'uid'}-${Math.random()}.${fileExt}`
    
        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

        if (uploadError) {
            throw uploadError
        }

        // onUpload(filePath)
        manageEdit(filePath)
    } catch (error) {
        alert('Error uploading avatar!')
    } finally {
        // setUploading(false)
    }
    }

    const deleteImage = async() => {
        const { data, error } = await supabase
            .storage
            .from('avatars')
            .remove([imagePath]);
        if(data){
            manageEdit("public/avatar.png")
        }
    }


    return (
        <section className='flex'>
                <div className='relative h-32 w-32 rounded-sm overflow-hidden mr-8'>
                    <Image
                        src={downloadImage(imagePath)}
                        fill
                        alt='Profile Image'
                        className='object-cover object-top'
                    />
                </div>
                <div>
                    <div className='flex flex-col sm:flex-row items-start'>
                        <label htmlFor="upload-profile-picture" className='btn btn-primary block py-2.5 px-4 mr-4 mb-4'>Upload Profile Picture</label>
                        <input 
                            type="file" 
                            name="upload-profile-picture" 
                            id="upload-profile-picture" 
                            className='hidden' 
                            onChange={uploadAvatar} 
                            accept='image/*' 
                        />
                        <button  
                            onClick={deleteImage} 
                            type='button' 
                            className={`btn bg-grey-100 text-white py-2.5 px-4  ${imagePath === "public/avatar.png" ? "cursor-not-allowed" : ""}`}
                            disabled={imagePath === "public/avatar.png" ? true : false}
                        >
                            Delete
                        </button>
                    </div>
                    <p>
                        <span className='font-semibold'>* Minimum required size is 210px by 210px.</span>
                    </p>
                </div>
            </section>
    )
}

export default ImagePreview