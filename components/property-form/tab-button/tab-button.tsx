import { SelectedTab } from '@/@types'
import { cn } from '@/lib/utils'
import { CurrentTab } from '@/utils/utils'
import React, { Dispatch, SetStateAction } from 'react'

interface Props{
    tabName: string, 
    activeTab: SelectedTab,
    TabType: SelectedTab, 
    setActiveTab: Dispatch<SetStateAction<SelectedTab>>
    disabled?: boolean
}

function TabButton({
    tabName, 
    TabType,
    activeTab,
    setActiveTab,
    disabled
}:Props) {
    return (
        <button 
            type="button" 
            className={cn(`btn btn-secondary border-b-4`, CurrentTab[TabType] === activeTab ? "border-b-orange" : "border-b-white")}
            onClick={()=>setActiveTab(CurrentTab[TabType])}
            disabled={disabled}
        >
            {tabName}
        </button>
    )
}

export default TabButton