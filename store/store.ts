import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../lib/features/user/user'
import menuReducer from '../lib/features/mobilemenu/mobilemenu'
import SavesReducer from '../lib/features/saves/saves'

export const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        saves: SavesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch