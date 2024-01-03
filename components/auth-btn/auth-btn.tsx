import React, { LegacyRef } from 'react'

function AuthBtn({submitBtnRef}:{submitBtnRef: LegacyRef< HTMLButtonElement>}) {
    return (
        <button 
            ref={submitBtnRef}
            className='group btn btn-primary'
        >
            <div className='hidden group-disabled:block group-hover:border-orange group-hover:border-t-gray-400 animate-spin h-4 w-4 border-2 border-white border-t-gray-400 rounded-full' />
            Continue
        </button>
    )
}

export default AuthBtn