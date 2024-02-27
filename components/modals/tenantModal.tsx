import React, { useState } from 'react'
import ModalWrapper from './wrapper'
import { useQuery } from 'react-query'
import { downloadImage, supabase } from '@/utils/utils'
import Image from 'next/image';
import { Button } from '../ui/button';
import { ArrowLeftIcon, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Divider from '../divider/divider';
import { AspectRatio } from '../ui/aspect-ratio';

interface Props{
    tenantId: string;
    name: string
}

function TenantModal({tenantId, name}:Props) {
    const [showIdCard, setShowIdCard] = useState<boolean>(false)
    const { isLoading, error, data } = useQuery('tenantData', async() =>
        await supabase.from("tenants").select().eq("id", tenantId)
    )

    return (
        <ModalWrapper
            modalTitle='Tenant Details'
            btnText={name}
            btnClass='hover:underline hover:text-orange'
        >
            {isLoading ? <div className='py-10'>
                <div className="h-10 w-10 border-2 border-orange rounded-full mx-auto border-t-gray-600 animate-spin"/>
            </div> : 
                <>{showIdCard ? 
                    <div className=' w-full py-4'>
                        <Button className='mb-4' onClick={()=>setShowIdCard(false)}><ArrowLeftIcon/> Back</Button>
                        <AspectRatio ratio={3.375 / 2.125}>
                                <Image src={downloadImage(data?.data![0].id_card, "identity_cards")} fill alt="Image" className="rounded-md object-cover" />
                        </AspectRatio>
                    </div> :
                    <div className='text-center '>
                        <div className="w-24 relative aspect-square rounded-full overflow-hidden border-4 border-orange mx-auto">
                            <Image
                                src={data ? downloadImage(data?.data![0].avatar, "avatars") : ""}
                                fill
                                alt={name + " Image"}
                                className='object-cover'
                            />
                        </div>
                        <div className='py-4'>
                            <h4 className='text-xl font-medium'>{data?.data![0].full_name}</h4>
                            <span>Tenant</span>
                            <div className='flex gap-4 justify-center py-4'>
                                <Link href={"tel:"+data?.data![0].phone_number}>
                                    <Button className='bg-orange font-medium flex gap-2 px-8'>
                                        <Phone size={16} /> Call
                                    </Button>
                                </Link>
                                <Link href={"mailto:"+ data?.data![0].email_address}>
                                    <Button className='bg-orange font-medium flex gap-2 px-8'>
                                        <Mail size={16} /> Email
                                    </Button>
                                </Link>
                            </div>
                            <div>
                                <span className='font-medium'>Address</span>
                                <address>{data?.data![0].contact_address}</address>
                            </div>

                            <Divider note='Guarantor'/>
                            <table className='text-left'>
                                <tbody>
                                    <tr>
                                        <td className='py-0.5 pr-4'>Name:</td>
                                        <td>{data?.data![0].guarantor_name}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-0..5 pr-4'>Phone No:</td>
                                        <td>{data?.data![0].garantor_phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-0.5 pr-4'>Address:</td>
                                        <td>{data?.data![0].guarantor_address}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className='pt-4'>
                                <Button onClick={()=>setShowIdCard(true)} className='bg-orange'>
                                    View Tenant Id
                                </Button>
                            </div>
                        </div>
                    </div>}
                </>
            }
        </ModalWrapper>
    )
}

export default TenantModal