import { RootState } from "@/store/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Saves {
    saves: string[]
}

const initialState = {
    saves: JSON.parse(localStorage.getItem("mavris-saves") ?? "[]")
} as Saves

export const savesSlice = createSlice({
    name: "saves",
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<string>) => {
            if(state.saves.includes(action.payload)){
                state.saves = state.saves.filter(item => item !== action.payload)
                localStorage.setItem('mavris-saves', JSON.stringify(state.saves))
                toast.success("Property removed Successfully")
            } else {
                state.saves.push(action.payload)
                localStorage.setItem('mavris-saves', JSON.stringify(state.saves))
                toast.success("Property Added successfully")
            }
        }
    }
})

export const {toggle} = savesSlice.actions;

export const selectSaves = (state: RootState) => state.saves

export default savesSlice.reducer