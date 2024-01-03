import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

interface UserInterface{
    user_metadata: any,
    id: string,
}

interface UserState {
    user: UserInterface | null
}

const initialState = {
    user: null
} as UserState

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserInterface>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export const {login, logout} = userSlice.actions;

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer