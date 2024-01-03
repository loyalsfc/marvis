import FormControl from '@/components/authentication/form-control/form-control'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import PreviewImage from '../preview-image/preview-image'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { PropertyDetailProp, PropertyImagePreview } from '@/@types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';


interface Props {
    selectedFile: PropertyImagePreview[],
    setSelectedFile: Dispatch<SetStateAction<PropertyImagePreview[]>>,
    formDetails: PropertyDetailProp,
    updateForm: (event: ChangeEvent<HTMLInputElement>) => void,
    imageId: string
}

function PropertyImages({
    selectedFile,
    setSelectedFile,
    formDetails,
    updateForm,
    imageId
}: Props) {
    const supabase = createClientComponentClient();
    const handleDragOver = (e:any) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files;
        processFile(file);
      };
    
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const filesList = e.target.files;
        if(!filesList) return;
        processFile(filesList);
      }
    
      async function processFile(filesList: FileList) {
        // filesList.item(0);
        
        for(let i=0; i<filesList?.length; i++){
          if(filesList.item(i)?.type.startsWith("image/")){
            // fileReader(filesList.item(i));
            const file = filesList.item(i)
            const fileExt = file!.name.split('.').pop()
            const filePath = `${imageId}/${'uid'}-${Math.random()}.${fileExt}`
            if(!file) return;
            const { data, error: uploadError } = await supabase.storage.from('property_images').upload(filePath, file)
            setSelectedFile(prevState => {
              return [...prevState, {url: data!.path, isMarkedFeatured: false}]
            });
          }
        }
      }

      const displayFile = (url: string) => {
        setSelectedFile(prevState => {
          return [...prevState, {url, isMarkedFeatured: false}]
        });
      }
    
      const fileReader = (file: any ) => {
        const reader = new FileReader();
          reader.onloadend = () => {
            let url = reader.result as string;
            setSelectedFile(prevState => {
              return [...prevState, {url, isMarkedFeatured: false}]
            });
          };
          reader.readAsDataURL(file);
      }

    return (
        <div className="py-6">
          {selectedFile.length > 0 && <PreviewImage selectedFile={selectedFile} selectedFunc={setSelectedFile}/>}
          <div>
            <span className='test-sm'>Property Image</span>
            <div 
              className=' border border-dark-100 border-dashed py-6 px-5 text-center flex flex-col items-center gap-5'
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h3 className=' text-5xl'><FaCloudUploadAlt/></h3>
              <p className='font-medium text-[15px]'>Drag and drop up to 48 images</p>
              <span className="block font-semibold ">or</span>
              <label htmlFor='image-upload' className="btn btn-primary">Upload Files</label>
              <input 
                type="file" 
                name="image-upload" 
                id="image-upload" 
                className='hidden'
                multiple={true}
                accept="image/*" 
                onChange={handleChange}
              />
              <div className='pt-1.5'>
                <p>* Minimum required size is 1240px by 720px having 4:3 or 16:9 aspect ratio.</p>
                <p>* Mark an image as featured by clicking the star icon, otherwise first image will be considered featured image.</p>
              </div>
            </div>
          </div>
          <div className='pt-8'>
            <h4 className='text-xl text-orange font-semibold mb-2'>Add Video</h4>
            <div>
              <span className="text-xs">YouTube, Vimeo, SWF File and MOV File are supported</span>
              <FormControl
                type='text'
                value={formDetails.video_url}
                handleChange={updateForm}
                id='video_url'
              />
            </div>
          </div>
        </div>
    )
}

export default PropertyImages