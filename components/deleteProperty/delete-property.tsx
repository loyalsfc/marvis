import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { supabase } from "@/utils/utils";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
  
export function DeleteProperty({propertyId}:{propertyId: number}) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const cancelBtn = useRef<HTMLButtonElement>(null)
    const router = useRouter();

    const deleteProperty = async() => {
        setIsDeleting(true)
        const {data, error} = await supabase.from("property_table").delete().eq("id", propertyId);
        
        if(!error){
          router.refresh();
          setIsDeleting(false);
          cancelBtn.current?.click();
        }
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="py-0">Delete</button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this property and it&apos;s associated units.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel ref={cancelBtn}>Cancel</AlertDialogCancel>
            <Button onClick={deleteProperty} className=" bg-orange">{isDeleting ? <div className="loader" /> : "Confirm"}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}