import React from 'react'

function ErrorMessage({formError}: {
    formError: { 
        isShown: boolean,
        text: string
}}) {
    return (
        <div 
            className={`text-center bg-red-500/10 text-red-500 font-medium py-2 text-sm rounded-md my-2 ${formError.isShown ? "visible" : "invisible"}`}
        >
            {formError.text}
        </div>
    )
}

export default ErrorMessage