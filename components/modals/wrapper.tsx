import React, { FC, ReactNode, Ref } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

interface Props {
    children: ReactNode, 
    modalTitle:string,
    modalDescription?:string,
    Icon?: FC,
    btnText?: string
    btnRef?: Ref<HTMLButtonElement>
    btnClass?: string;
}

function ModalWrapper({children, modalTitle, modalDescription, Icon, btnText, btnRef, btnClass}:Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={btnClass} ref={btnRef}>
                    {Icon && <Icon/>}
                    {btnText}
                </button>
            </DialogTrigger>
            <DialogContent className=" w-11/12 sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <DialogDescription>
                        {modalDescription}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ModalWrapper