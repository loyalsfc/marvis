import { OwnerProp, PropertyOnwerProp } from '@/@types'
import FormControl, { FormTextArea } from '@/components/authentication/form-control/form-control'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import ImagePreview from '../image-preview/image-preview'

interface Props {
    formDetails:PropertyOnwerProp, 
    formFunc: Dispatch<SetStateAction<PropertyOnwerProp>>,
    existingOwners: OwnerProp[] | null
    ownerId: string, 
    setOwnerId: Dispatch<SetStateAction<string>>;

}

function PropertyOwner({formDetails, formFunc, existingOwners, ownerId, setOwnerId}:Props) {
    const [open, setOpen] = React.useState(false);
    const owners = existingOwners ? existingOwners.map(item => {
        return {label: item.first_name + " " + item.last_name, value: item.id.toString()}
    }) : [];
    
    const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        formFunc(prevState => {
            return{...prevState, [id]: value}
        })
    }

    const manageEdit = async(filePath: string) => {
        formFunc(prevState => {
            return {...prevState, profile_picture: filePath};
        });
    }

    return (
        <div className='py-6'>
            <ImagePreview
                imagePath={formDetails.profile_picture}
                manageEdit={manageEdit}
            />
            <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-10'>
                    <FormControl
                        type='text'
                        value={formDetails.first_name}
                        handleChange={updateForm}
                        id='first_name'
                        label='First Name'
                    />
                    <FormControl
                        type='text'
                        value={formDetails.last_name}
                        handleChange={updateForm}
                        id='last_name'
                        label='Last Name'
                    />
                    <FormControl
                        type='email'
                        value={formDetails.email}
                        handleChange={updateForm}
                        id='email'
                        label='Email'
                    />
                    <FormControl
                        type='number'
                        value={formDetails.mobile_number}
                        handleChange={updateForm}
                        id='mobile_number'
                        label='Mobile Number'
                    />
                    <FormControl
                        type='number'
                        value={formDetails.office_number}
                        handleChange={updateForm}
                        id='office_number'
                        label='Office Number'
                    />
                    <FormControl
                        type='number'
                        value={formDetails.fax_number}
                        handleChange={updateForm}
                        id='fax_number'
                        label='Fax Number'
                    />
                    <FormTextArea
                        value={formDetails.biological_information}
                        handleChange={updateForm}
                        id='biological_information'
                        label='Biological Information'
                    />
                    <FormTextArea
                        value={formDetails.address}
                        handleChange={updateForm}
                        id='address'
                        label='Address'
                    />
                </div>
            </div>
            <p className='flex items-center py-10'>
                <span className="block h-px flex-1 bg-dark-100"/>
                <span className='font-semibold block px-1'>or</span>
                <span className="block h-px flex-1 bg-dark-100"/>
            </p>    
            <div className='grid place-content-center'>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="secondary"
                            role="combobox"
                            aria-expanded={open}
                            className="btn btn-primary mx-auto"
                        >
                            {ownerId
                                ? owners.find((owner) => owner.value === ownerId)?.label
                                : "Select Existing Onwer"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search Landlord..." />
                            <CommandEmpty>No Landlord found.</CommandEmpty>
                            <CommandGroup>
                                {owners.map((landlord) => (
                                <CommandItem
                                    key={landlord.value}
                                    value={landlord.value}
                                    onSelect={(currentValue) => {
                                    setOwnerId(currentValue === ownerId ? "" : currentValue)
                                    setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            ownerId === landlord.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {landlord.label}
                                </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default PropertyOwner