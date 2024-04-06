'use client'

import React, { ChangeEvent, useState } from 'react'
import { FeaturesProp, OwnerProp, PropertyDetailProp, PropertyImagePreview, PropertyOnwerProp, PropertyProps, SelectedTab } from '@/@types';
import { CurrentTab } from '@/utils/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks/hooks';
import TooltipModal from '../tooltip/tooltip';
import { v4 as uuidv4 } from 'uuid';
import TabButton from '../property-form/tab-button/tab-button';
import PropertyBasicInfo from '../property-form/property-basic-info/property-basic-info';
import PropertyImages from '../property-form/property-images/property-images';
import Features from '../property-form/features/features';
import PropertyOwner from '../property-form/property-owner/property-owner';

interface Props{
    propertyDetails: PropertyProps[] | null,
    existingOwners: OwnerProp[]
}

function EditForm({existingOwners, propertyDetails}: Props) {
    
    const {id, property_title, property_address, rent_price, property_type, property_location, bedroom, bath, year_built, units, property_description, property_image, video_url, property_label, label_color, additional_details, features, property_owner, property_units, vacant_units} = propertyDetails![0];
    const imagesId = uuidv4();
  const user = useAppSelector((state) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SelectedTab>('Basic')
  const [selectedFile, setSelectedFile] = useState<PropertyImagePreview[]>(property_image);
  const [additionalDetails, setAdditionalDetails] = useState<FeaturesProp[]>(additional_details)
  const [featureList, setFeaturesList] = useState<string[]>(features ?? [])
  const [formDetails, setFormDetails] = useState<PropertyDetailProp>({
    property_title,
    property_address,
    rent_price,
    property_type,
    property_location,
    bedroom,
    bath,
    year_built,
    units,
    video_url,
    property_label,
    property_label_color: label_color ?? "",
    property_description
  })
  const [existingOwnerId, setExistingOwnerId] = React.useState(property_owner.id.toString());
  const [propertyOwnerInfo, setPropertyOwnerInfo] = useState<PropertyOnwerProp>({
    profile_picture: "public/avatar.png",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    office_number: "",
    fax_number: "",
    biological_information: "",
    address: ""
  })
  const isLastTab = activeTab === CurrentTab.Owner;

  const updateForm = (event: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = event.target;
    event.target.nextElementSibling?.classList.replace('visible', 'invisible');
    setFormDetails(prevDetails => {
        return {...prevDetails, [id]: value}
    })
    
  }

  const nextTab = () => {
    if(activeTab === CurrentTab.Basic){
      setActiveTab(CurrentTab.Gallery)
    } else if (activeTab === CurrentTab.Gallery){
      setActiveTab(CurrentTab.Features)
    } else {
      setActiveTab(CurrentTab.Owner)
    }
    if(isLastTab){
      saveForm();
    }
  }

  const prevTab = () => {
    if(isLastTab){
      setActiveTab(CurrentTab.Features)
    } else if (activeTab === CurrentTab.Features){
      setActiveTab(CurrentTab.Gallery)
    } else {
      setActiveTab(CurrentTab.Basic)
    }
  }

  const saveForm = async() => {
    setIsSubmitting(true);
    let newOwnerId
    if(existingOwnerId === "") {
      const {data: owner , error: ownerError} = await supabase
        .from("property_owner")
        .insert({...propertyOwnerInfo, agent_id: user?.id})
        .select()
        newOwnerId = owner![0]?.id
    }
    
    const property_owner = existingOwnerId ? existingOwnerId : newOwnerId;
    const {
      property_title,
      property_address,
      rent_price,
      property_type,
      property_location,
      bedroom,
      bath,
      year_built,
      units,
      video_url,
      property_label,
      property_label_color,
      property_description
    } = formDetails;

    const {data: property, error: propertyError} = await supabase
      .from("property_table")
      .update({
        property_title,
        property_address,
        rent_price,
        property_type,
        property_location,
        bedroom,
        bath,
        year_built,
        video_url,
        property_image: selectedFile,
        property_label,
        additional_details: additionalDetails,
        property_owner,
        label_color: property_label_color,
        vacant_units: units === formDetails.units ? formDetails.units : formDetails.units,
        agent_id: user?.id,
        property_units: units === formDetails.units ? property_units : Array.from({length: formDetails.units}).map((_,index) => {
          return {
            unit: index + 1,
            tenant: null,
            rent_date: null,
            expiry_date: null,
            isAvailable: true,
            rent_duration: null
          }
        }),
        property_description,
        features: featureList
      })
      .eq('id', id)
    
    if(!propertyError){
      router.push("/dashboard/all-properties")
    }
      
    console.log(property);
    console.log(propertyError);
  }

  const disabledNavButtons = !formDetails.property_title || !formDetails.property_address || !formDetails.rent_price

  return (
    <form action="" className='h-full overflow-scroll no-scrollbar relative'>
        <div className='flex items-center justify-center py-3 sticky top-0 bg-white z-40'>
          <TabButton
            tabName='Basic' 
            activeTab={activeTab} 
            TabType={CurrentTab.Basic}
            setActiveTab={setActiveTab} 
          />
          {disabledNavButtons? <TooltipModal text='Gallery' /> : <TabButton 
            tabName='Gallery' 
            activeTab={activeTab} 
            TabType={CurrentTab.Gallery}
            setActiveTab={setActiveTab} 
            disabled={disabledNavButtons}
          />}
          {disabledNavButtons? <TooltipModal text='Features' /> : <TabButton 
            tabName='Features' 
            activeTab={activeTab} 
            TabType={CurrentTab.Features}
            setActiveTab={setActiveTab} 
            disabled={disabledNavButtons}
          />}
          {disabledNavButtons? <TooltipModal text='House Owner' /> : <TabButton 
            tabName='House Owner' 
            activeTab={activeTab} 
            TabType={CurrentTab.Owner}
            setActiveTab={setActiveTab} 
            disabled={disabledNavButtons}
          />}
        </div>
        {CurrentTab.Basic === activeTab && <PropertyBasicInfo
          formDetails={formDetails}
          updateForm={updateForm}
          setFormDetails={setFormDetails}
        />}
        {CurrentTab.Gallery === activeTab && <PropertyImages
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          formDetails={formDetails}
          updateForm={updateForm}
          imageId={imagesId}
        />}
        {CurrentTab.Features === activeTab && <Features
          selectedFeatures={featureList} 
          featuresFunc={setFeaturesList}
          additionalDetails={additionalDetails}
          additionalDetailsFunc={setAdditionalDetails}
          formDetails={formDetails}
          updateForm={updateForm}
        />}
        {CurrentTab.Owner === activeTab && <PropertyOwner
          formDetails={propertyOwnerInfo}
          formFunc={setPropertyOwnerInfo}
          existingOwners={existingOwners}
          ownerId={existingOwnerId}
          setOwnerId={setExistingOwnerId}
        />}
        <div className='flex justify-between sticky bottom-0 bg-white pt-5 border-t'>
          <button 
            type="button"
            className='btn btn-primary py-2 disabled-btn'
            disabled={activeTab === CurrentTab.Basic}
            onClick={prevTab}
          >
            Previous
          </button>
          <button 
            type="button"
            className='btn btn-primary py-2 disabled-btn'
            disabled={!formDetails.property_title || !formDetails.property_address || !formDetails.rent_price}
            onClick={nextTab}
          >
            {isSubmitting && <div className='loader' />}
            {isLastTab ? "Submit" : "Next"}
          </button>
        </div>
    </form>
  )
}

export default EditForm