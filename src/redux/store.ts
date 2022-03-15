import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "./itemsSlice"
import userSlice from "./userSlice"


export const store = configureStore({
    reducer: {
        user: userSlice,
        items: itemsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch