import React, { useRef, useState } from 'react'
import ModalWrapper from '@/components/modals/wrapper';
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
import { Textarea } from "@/components/ui/textarea"
import { supabase } from '@/utils/utils'
 
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full  Address must be at least 3 characters.",
  }),
  emailAddress: z.string().email().min(5, {
    message: "Email  Address must be at least 5 characters.",
  }),
  question: z
    .string()
    .max(1000, {
      message: "Message must not be longer than 100 characters.",
    }),
})

interface Props {
  slug:string,
  agentId: string
}

function MessageModal({slug, agentId}: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [loader, setLoader] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          fullName: "",
          emailAddress: "",
          question: ""
      },
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    const {fullName, emailAddress, question} = values;
    setLoader(true);
    await supabase.from("messages").insert({
      property_slug: slug,
      client_name: fullName,
      client_email: emailAddress,
      question,
      agent_id: agentId
    })
    toast.success("Message Sent Successfully")
    setLoader(false);
    closeBtnRef.current?.click();
  }
    return (
        <ModalWrapper
            modalTitle='Ask A Question'
            btnText="Ask a question"
            btnClass="text-orange bg-orange/20 font-medium w-full min-[928px]:my-4 gap-2 flex items-center justify-center rounded-md px-4 py-2 hover:bg-primary"
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input placeholder="Email Address" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your Question"
                                    className="resize-none"
                                    {...field}
                                />  
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

export default MessageModal