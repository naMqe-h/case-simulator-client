import { createSlice } from "@reduxjs/toolkit";
import { singleCase, singleItem } from "../utils/Interfaces";
import { RootState } from "./store";


interface casesSliceInterface {
    cases: singleCase[]
}

const initialState: casesSliceInterface = {
    cases: []
}

export const casesSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {
        setAllCases: (state, action) => {
            state.cases = action.payload
        }
    }
})

export const { setAllCases } = casesSlice.actions
export const selectUser = (a: RootState) => a
export default casesSlice.reducer