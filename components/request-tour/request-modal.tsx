import React from 'react'
import ModalWrapper from '../modals/wrapper'
import { LocateFixedIcon } from 'lucide-react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  emailAddress: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function RequestModal() {
    return (
        <ModalWrapper
            modalTitle='Enter Your Contact Info'
            btnText="Request Tour"
            Icon={LocateFixedIcon}
            btnClass="w-full bg-orange my-4 font-semibold gap-2 text-white flex items-center justify-center rounded-md px-4 py-2 hover:bg-primary"
        >
          <form action="">
            
          </form>
        </ModalWrapper>
    )
}

export default RequestModal