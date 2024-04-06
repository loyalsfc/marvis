import { PropertyDetailProp } from '@/@types';
import FormControl, { FormSelect } from '@/components/authentication/form-control/form-control'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props{
    formDetails: PropertyDetailProp;
    updateForm: (event: ChangeEvent<HTMLInputElement>) => void;
    setFormDetails: Dispatch<SetStateAction<PropertyDetailProp>>;
}

function PropertyBasicInfo({formDetails, updateForm, setFormDetails}:Props) {
    const handleChange = (value: string) => {
        setFormDetails(prevDetails => {
            return {...prevDetails, property_description: value}
        })
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8'>
            <div className='md:col-span-2 lg:col-span-3'>
                <FormControl
                    type='text'
                    value={formDetails.property_title}
                    handleChange={updateForm}
                    id='property_title'
                    label='Property Title'
                />
            </div>
            <div className='md:col-span-2 lg:col-span-3'>
                <FormControl
                    type='text'
                    value={formDetails.property_address}
                    handleChange={updateForm}
                    id='property_address'
                    label='Property Address'
                />
            </div>
            <div className='md:col-span-2 lg:col-span-3'>
                <span className='font-medium block mb-1'>Property Description</span>
                <div className="h-64">
                    <ReactQuill 
                        theme="snow"
                        value={formDetails.property_description} 
                        onChange={(e)=>handleChange(e)}
                        className='h-44 border-orange'
                    />
                </div>
            </div>
            <div className=''>
                <FormControl
                    type='number'
                    value={formDetails.rent_price}
                    handleChange={updateForm}
                    id='rent_price'
                    label='Rent Price'
                />
            </div>
            <div>
                <FormSelect
                    value={formDetails.property_type}
                    handleChange={updateForm}
                    id='property_type'
                    label='Property Type'
                >
                    <optgroup label='Commercial'>
                        <option value="office">Office</option>
                        <option value="shop">Shop</option>
                    </optgroup>
                    <optgroup label='Residential'>
                        <option value="apartment">Apartment</option>
                        <option value="detached_house">Detached House</option>
                        <option value="flat">Flat</option>
                        <option value="massionette">Massionette</option>
                        <option value="self_contain">Self Contain</option>
                        <option value="single_family">Single Family</option>
                        <option value="terrace">Terrace</option>
                        <option value="villa">Villa</option>
                    </optgroup>
                </FormSelect>
            </div>
            <div>
                <FormSelect
                    value={formDetails.property_location}
                    handleChange={updateForm}
                    id='property_location'
                    label='Property Location'
                >
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                    <option value="porthacourt">Portharcourt</option>
                </FormSelect>
            </div>
            <div className=''>
                <FormControl
                    type='number'
                    value={formDetails.bedroom}
                    handleChange={updateForm}
                    id='bedroom'
                    label='Bedroom'
                />
                </div>
            <div className=''>
                <FormControl
                    type='number'
                    value={formDetails.bath}
                    handleChange={updateForm}
                    id='bath'
                    label='Bath'
                />
            </div>
            <div className=''>
                <FormControl
                    type='number'
                    value={formDetails.year_built}
                    handleChange={updateForm}
                    id='year_built'
                    label='Year Built'
                />
            </div>
            <div className=''>
                <FormControl
                    type='number'
                    value={formDetails.units.toString()}
                    handleChange={updateForm}
                    id='units'
                    label='Units'
                />
            </div>
        </div>
    )
}

export default PropertyBasicInfo