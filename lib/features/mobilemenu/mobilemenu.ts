import { RootState } from "@/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Menu{
    value: boolean
}

const initialState = {
    value: false
} as Menu

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
        close: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
        toggle: (state) => {
            state.value = !state.value
        }
    }
})

export const {open, close, toggle} = menuSlice.actions

export const selectMenu = (state: RootState) => state.menu

export default menuSlice.reducer