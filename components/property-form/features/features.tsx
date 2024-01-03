import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import AdditionalDetails from './additional-details';
import { FeaturesProp, PropertyDetailProp } from '@/@types';

const feature_list: string[] = [
    "2 Stories",
    "Central Heating",
    "Cinemas",
    "Children’s Play Area",
    "Dual Sinks",
    "Emergency Exit",
    "Fire Alarm",
    "Fire Place",
    "Gym",
    "Home Theater",
    "Laundry Room",
    "Lawn",
    "Marble Floors",
    "Next to main road",
    "Parking Space",
    "Pop Ceiling",
    "Security",
    "Smart Technology",
    "Swimming Pool",
]

interface Props{
    selectedFeatures: string[],
    featuresFunc: Dispatch<SetStateAction<string[]>>
    additionalDetails: FeaturesProp[]
    additionalDetailsFunc: Dispatch<SetStateAction<FeaturesProp[]>>
    formDetails: PropertyDetailProp;
    updateForm: (event: ChangeEvent<HTMLInputElement>) => void
}

function Features({
    selectedFeatures,
    featuresFunc, 
    additionalDetails, 
    additionalDetailsFunc,
    formDetails,
    updateForm
}:Props) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {checked, value} = e.target;
        if(checked){
            featuresFunc(prevState => {
                return [...prevState, value]
            })
        } else {
            featuresFunc(prevState => {
                return prevState.filter(item => item !== value);
            })
        }
    }

    return (
        <div className='py-6'>
            <AdditionalDetails features={additionalDetails} featuresFunc={additionalDetailsFunc} />
            <div className='pt-8 text-[15px] font-semibold'>
                <span className="font-medium text-dark-100">Features</span>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {feature_list.map((item, index) => {
                        return(
                            <div className='flex items-center gap-4 py-4' key={index}>
                                <input 
                                    type="checkbox" 
                                    name={"feature_"+item} 
                                    id={"feature_"+item} 
                                    className=' accent-orange'
                                    value={item}
                                    onChange={handleChange}
                                />
                                <label htmlFor={"feature_"+item} className='font-medium'>{item}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='pt-8 grid grid-cols-2 gap-6'>
                <div>
                    <label htmlFor="property_label" className='font-medium text-dark-100 block mb-1'>Property Label Text</label>
                    <input 
                        type="text" 
                        className='property-input' 
                        value={formDetails.property_label}
                        onChange={updateForm}
                        id='property_label'
                    />
                    <span className='text-xs font-medium'>You can add a property label to display on property thumbnails. Example: Hot Deal</span>
                </div>
                <div className=''>
                    <span className='font-medium text-dark-100 block mb-1'>Label Background Color</span>
                    <div className='flex w-fit h-12 border border-dark-100 '>
                        <input 
                            type="color" 
                            name="property_label_color" 
                            className='h-full' 
                            id="property_label_color" 
                            value={formDetails.property_label_color}
                            onChange={updateForm}
                        />
                        <label htmlFor="property_label_color" className='block h-full p-2.5'>Select Color</label>
                    </div>
                    <span className="text-xs leading-tight block font-medium">Set a label background color. Otherwise label text will be displayed with transparent background.</span>
                </div>
            </div>
        </div>
    )
}

export default Features