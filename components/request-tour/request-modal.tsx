import React, { useRef, useState } from 'react'
import ModalWrapper from '../modals/wrapper'
import { LocateFixedIcon } from 'lucide-react'
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { supabase } from '@/utils/utils'
 
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full  Address must be at least 3 characters.",
  }),
  emailAddress: z.string().email().min(5, {
    message: "Email  Address must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Phone Number must be at least 2 characters.",
  }),
})

enum tour  {
  VIRTUAL = "virtual",
  INPERSON = "in person"
}

interface Props {
  date: Date, 
  tourType: tour, 
  slug:string,
  agentId: string,
  propertyTitle: string
}

function RequestModal({date, tourType, slug, agentId, propertyTitle}: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [loader, setLoader] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          fullName: "",
          emailAddress: "",
          phoneNumber: ""
      },
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    const {fullName, emailAddress, phoneNumber} = values;
    setLoader(true);
    const {error} = await supabase.from("booked_tours")
      .insert({
        tour_type: tourType,
        property_slug: slug,
        property_title: propertyTitle,
        tour_date: date.toISOString(),
        client_name: fullName,
        client_phone_number: phoneNumber,
        client_email: emailAddress,
        agent_id: agentId
      })
    setLoader(false);
    if(error){
      toast.error("An Error Occured");
      return;
    }
    toast.success("Tour Booked Successfully")
    closeBtnRef.current?.click();
  }
    return (
        <ModalWrapper
            modalTitle='Enter Your Contact Info'
            btnText="Request Tour"
            Icon={LocateFixedIcon}
            btnClass="w-full bg-orange my-4 font-semibold gap-2 text-white flex items-center justify-center rounded-md px-4 py-2 hover:bg-primary"
            btnRef={closeBtnRef}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='bg-orange flex justify-center w-full'>
                {loader ? <p className='h-4 w-4 rounded-full border-2 border-t-gray-400 border-white animate-spin'/> :
                "Submit"}
              </Button>
            </form>
          </Form>
        </ModalWrapper>
    )
}

export default RequestModal