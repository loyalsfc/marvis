import { FeaturesProp } from '@/@types';
import React, { ChangeEvent, ChangeEventHandler, Dispatch, FocusEventHandler, SetStateAction, useState } from 'react'
import { FaGripHorizontal, FaPlus, FaTrash } from 'react-icons/fa'

interface InputProp{
    title: string;
    value?: string;
    handleChange: ChangeEventHandler<HTMLInputElement>,
    handleFocus: FocusEventHandler<HTMLInputElement>,
}

function Input({title, value, handleChange,handleFocus}:InputProp){
    return(
        <div className='flex flex-col flex-1'>
            <label className='font-medium mb-1'>{title}</label>
            <input
                type='text'
                className='property-input'
                placeholder={title}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
            />
        </div>
    )
}

function AdditionalDetails({features, featuresFunc}: {features: FeaturesProp[], featuresFunc:Dispatch<SetStateAction<FeaturesProp[]>>}) {
    const [activeId, setActiveId] = useState<string>('feature1')
    const addFeatures = () => {
        featuresFunc(prevState => {
            return [...prevState, {
                id: "features" + new Date().getTime(),
                title: "",
                value: ""
            }]
        })
    }

    const deleteFeatures = (id: string) => {
        featuresFunc(prevState => {
            return prevState.filter(item => item.id !== id)
        })
    }

    const setFeaturesTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        featuresFunc(prevState => {
            return prevState.map(item => {
                if(item.id === activeId){
                    return {...item, title: value}
                }else{
                    return item
                }
            })
        })
    }

    const setFeaturesValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value: string = e.target.value;
        featuresFunc(prevState => {
            return prevState.map(item => {
                if(item.id === activeId){
                    return {...item, value}
                }else{
                    return item
                }
            })
        })
    }
    
    return(
        <div>
            <span className="text-dark-100 font-medium">Additional Details</span>
            <div>
                <ul className='pt-6 mb-8 flex flex-col gap-4'>
                    {features.map(item => {
                        return (
                            <li key={item.id} className='flex items-end gap-0.5 md:gap-4 lg:gap-8'>
                                <button 
                                    className='p-2 py-4 sm:p-4 shadow-md bg-dark-100/5 cursor-grabbing' 
                                    type='button'
                                >
                                    <FaGripHorizontal/>
                                </button>
                                <Input 
                                    title="Title" 
                                    value={item.title}
                                    handleChange={setFeaturesTitle}
                                    handleFocus={()=>setActiveId(item.id)}
                                />
                                <Input 
                                    title="Value" 
                                    value={item.value} 
                                    handleChange={setFeaturesValue}
                                    handleFocus={()=>setActiveId(item.id)}
                                />
                                <button 
                                    className='p-2 py-4 md:p-4 shadow-md bg-orange rounded-md text-white' 
                                    type='button'
                                    onClick={()=>deleteFeatures(item.id)}
                                >
                                    <FaTrash/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={addFeatures} className='btn btn-primary' type='button'>
                    <FaPlus /> Add More
                </button>
            </div>
        </div>
    )
}

export default AdditionalDetails