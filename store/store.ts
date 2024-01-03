import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../lib/features/user/user'
import menuReducer from '../lib/features/mobilemenu/mobilemenu'

export const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch