import { configureStore } from "@reduxjs/toolkit";
import appstate from './Slice'
export const store = configureStore({
    reducer: {
        appstate,
    }
})