'use client'

import { store } from '@/store/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import {QueryClient, QueryClientProvider} from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function ReduxProvider({children}:{children: ReactNode}) {
    const queryClient = new QueryClient()
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ToastContainer />
            </QueryClientProvider>
        </Provider>
    )
}

export default ReduxProvider