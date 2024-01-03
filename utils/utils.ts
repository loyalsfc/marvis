import { PropertyUnits } from '@/@types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...input: ClassValue[]){
    return twMerge(clsx(input))
}

export enum CurrentTab {
    Basic = "Basic",
    Gallery = "Gallery",
    Features = "Features",
    Owner = "Owner",
}

export const supabase = createClientComponentClient();
export const downloadImage = (imagePath: string, folder?: string):string => {    
    const {data} = supabase
        .storage
        .from(folder ?? 'avatars')
        .getPublicUrl (imagePath);
    return data.publicUrl
}

export const daysToExpire = (dateISO: string) => {
    const rentDueDate = new Date(dateISO);
    const currentDate = new Date();
    const secondsToDay = 1000 * 60 * 60 * 24;
    return Math.floor((rentDueDate.getTime() - currentDate.getTime()) / secondsToDay);
}

export const notifications = (properties: {
    property_title: any;
    property_units: any;
    vacant_units: any;
    units: any;
    slug: any;
}[] | null, tenants: {
    full_name: any;
    id: any;
}[] | null) => {
    const expiredOrPreexpiredProperty: {notification: string, date: string, slug:string, unit:number}[] = [];
    //Loop through all the properties
    properties?.forEach((item => {
      //Go through all the properties units
      item.property_units.forEach((unit: PropertyUnits )=> {
        //If the unit is not available
        if(!unit.isAvailable){
          //check if the expiry day is less than 31
          const remainingDays = daysToExpire(unit.expiry_date);
          if(remainingDays < 31 && remainingDays > 0){
            const notification = `The unit ${unit.unit} of ${item.property_title} will expire on ${expiryDate(unit.expiry_date)} reach out to ${tenants?.find(item => item.id == unit.tenant)?.full_name} on your tenant list`
            const date = getPreExpiredPeriodStart(unit.rent_date, parseInt(unit.rent_duration))
            // propertyUnits.push({unit: unit, title: item.property_title});
            expiredOrPreexpiredProperty.push({notification, date, slug: item.slug, unit: unit.unit})
          } else if(remainingDays < 0) {
            const notification = `The unit ${unit.unit} of ${item.property_title} has expire on ${expiryDate(unit.expiry_date)} reach out to ${tenants?.find(item => item.id == unit.tenant)?.full_name} on your tenant list`
            const date = unit.expiry_date;
            expiredOrPreexpiredProperty.push({notification, date, slug: item.slug, unit: unit.unit})
          }
        }
      })
    }))
    return expiredOrPreexpiredProperty.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();
  }

  const expiryDate = (dateIso: string) => {
    return new Date(dateIso).toDateString()
  }

  const getPreExpiredPeriodStart = (dateISO: string, rentDuration: number) => {
    const rentDate = new Date(dateISO);
    const addElevenMonths = rentDate.getTime() + (rentDuration * 11 * 30 * 24 * 60 * 60 * 1000)
    return new Date(addElevenMonths).toISOString();
  }

export function getFeaturedImage(property_image: {url: string, isMarkedFeatured:boolean}[]){
    const storagePath = property_image.some(item => item.isMarkedFeatured) ? property_image.find(item => item.isMarkedFeatured)?.url : property_image[0].url
    const {data} = supabase
        .storage
        .from("property_images")
        .getPublicUrl (storagePath ?? "")
    return data.publicUrl
}