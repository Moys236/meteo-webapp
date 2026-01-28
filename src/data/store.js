import { configureStore } from "@reduxjs/toolkit";
import { meteoReducer } from "./meteoSlice";

export const store = configureStore({
    reducer: {
        meteo: meteoReducer,
    },
});