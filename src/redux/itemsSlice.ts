import { createSlice } from "@reduxjs/toolkit";
import { singleItem } from "../utils/Interfaces";
import { RootState } from "./store";


interface itemsSliceInterface {
    items: {[key: number] : singleItem[]}
}

const initialState: itemsSliceInterface = {
    items: {}
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setAllItems: (state, action) => {
            state.items = action.payload
        }
    }
})

export const { setAllItems } = itemsSlice.actions
export const selectUser = (a: RootState) => a
export default itemsSlice.reducer