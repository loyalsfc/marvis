import ConfirmApplication from '@/components/application-modals/confirm-application';
import ReviewApplication from '@/components/application-modals/review-application';
import { downloadImage } from '@/utils/utils';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function Page({params}:{params: {id:string}}) {
    const supabase = createServerComponentClient({cookies})
    const {data: user} = await supabase.auth.getUser();
    const {data, error} = await supabase
        .from("property_applications")
        .select(`
            *, 
            tenant_id(*),
            property_slug(*)
        `)
        .eq("agent_id", user.user?.id)
        .eq('id', params.id)
        .limit(1)
        .single()

    if(error){
        return <p className='pt-20 text-center font-bold text-orange'>An Error Occured</p>
    }

    const {id: propertyId, slug, property_title, property_location, property_units} = data.property_slug
    const {id, created_at, full_name, id_card, avatar, phone_number, email_address, contact_address, guarantor_name, garantor_phone_number, guarantor_address} = data.tenant_id

    return (
        <div className='h-full w-full flex flex-col page-wrapper overflow-y-scroll'>
            <Link 
                href={`/properties/${slug}`}
                className='text-2xl font-bold hover:underline text-orange'
            >
                {property_title}
            </Link>       
            <span className='font-medium capitalize'>{property_location}</span>
            <p>Available unit: {property_units.filter((item: {isAvailable: boolean}) => item.isAvailable)?.length}</p>

            <div className='pt-6'>
                <div className='flex items-center gap-2 pb-2'>
                    <span className="flex-1 h-px bg-primary"/>
                    <h3 className='text-center font-semibold text-orange text-xl'>Tenant Details</h3>
                    <span className="flex-1 h-px bg-primary"/>
                </div>
                <div className='grid grid-cols-2'>
                    <div className='col-span-2 mb-2'>
                        <div className=' h-32 w-32 overflow-hidden rounded-md'>
                            <Image
                                src={downloadImage(avatar)}
                                height={128}
                                width={128}
                                alt='User image'
                            />
                        </div>
                    </div>
                    <p className='py-2'>
                        <span className='font-semibold'>Full Name: </span> {full_name}
                    </p>
                    <p className='py-2'>
                        <span className='font-semibold'>Application Date: </span> {new Date(created_at).toLocaleDateString("en-US")}
                    </p>
                    <p className='py-2'>
                        <span className='font-semibold'>Phone Number: </span> {phone_number}
                    </p>
                    <p className='py-2'>
                        <span className='font-semibold'>Email: </span> {email_address}
                    </p>
                    <div className='col-span-2'>
                        <span className="block font-semibold">Contact Address:</span>
                        <p>{contact_address}</p>
                    </div>
                </div>
                <div className='grid grid-cols-2 pt-8'>
                    <div className='flex py-2 col-span-2 items-center gap-2'>
                        <span className="flex-1 h-px bg-primary"/>
                        <h5 className='font-semibold text-orange text-xl'>Guarantor Details</h5>
                        <span className="flex-1 h-px bg-primary"/>
                    </div>
                    <p className='py-2'>
                        <span className='font-semibold'>Guarantor Name: </span> {guarantor_name}
                    </p>
                    <p className='py-2'>
                        <span className='font-semibold'>Guarantor Phone No: </span> {garantor_phone_number}
                    </p>
                    <div className='col-span-2'>
                        <span className="block font-semibold">Guarantor Address:</span>
                        <p>{guarantor_address}</p>
                    </div>
                </div>
                <div>
                    <div className='flex py-2 col-span-2 items-center gap-2'>
                        <span className="flex-1 h-px bg-primary"/>
                        <h5 className='font-semibold text-orange text-xl'>Tenant Id</h5>
                        <span className="flex-1 h-px bg-primary"/>
                    </div>
                    <ReviewApplication userIdentification={id_card} />
                </div>

                <ConfirmApplication units={property_units} tenantId={id} propertyId={propertyId} slug={slug} />
            </div>
        </div>
    )
}

export default Page