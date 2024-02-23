import { z } from "zod";

export const formSchema = z.object({
    full_name: z.string().min(2,{
        message: "Name can not be less than 2 characters"
    }).max(50),
    phone_number: z.string().min(10,{
        message: "Phone Number can not be less than 10 characters"
    }).max(14,{
        message: "Phone Number can not be more than 14 characters"
    }),
    email_address: z.string().email().min(5),
    contact_address: z.string()
        .min(10, {
            message: "Address must be at least 10 characters.",
        })
        .max(160, {
            message: "Address must not be longer than 30 characters.",
        }),
    guarantor_name: z.string().min(2,{
        message: "Name can not be less than 2 characters"
    }).max(50),
    garantor_phone_number: z.string().min(10,{
        message: "Phone Number can not be less than 10 characters"
    }).max(14,{
        message: "Phone Number can not be more than 14 characters"
    }),
    guarantor_address: z.string()
    .min(10, {
        message: "Address must be at least 10 characters.",
    })
    .max(160, {
        message: "Address must not be longer than 30 characters.",
    }),
    
})

export type tenantFormTypes = z.infer<typeof formSchema> 