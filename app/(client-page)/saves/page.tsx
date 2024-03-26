import Saves from '@/components/saves/saves'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata  = {
    title: "Saved Properties"
}

function Page() {
    return (
        <Saves />
    )
}

export default Page