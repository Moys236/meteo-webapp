import { createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/";

const initialState = {
    actuel: {},
    forecast: [],
    villes: [
        { id: 1, ville: 'Tangier', pays: 'MA', ouvre: true },
        { id: 2, ville: 'Tetouan', pays: 'MA', ouvre: false },
        { id: 3, ville: 'larache', pays: 'MA', ouvre: false },
        { id: 4, ville: 'asilah', pays: 'MA', ouvre: false }
    ],
    actuelVille: {
        id: "3"
    },
    units: {
        type: "metric"
    },
    aLoading: true,
    fLoading: true
};

const meteoSlice = createSlice({
    name: "meteo",
    initialState,
    reducers: {
        setActuel(state, action) {
            state.actuel = action.payload;
            state.aLoading = false;
        },
        setForecast(state, action) {
            state.forecast = action.payload;
            state.fLoading = false;
        },
        setVilles(state, action) {
            state.villes = action.payload;
        },
        setActuelVille(state, action) {
            state.actuelVille = action.payload;
        },
        setUnits(state, action) {
            state.units = action.payload;
        }
    },
});

// Villes
export const fetchVilles = ()=> async (dipatch) => {
    try {
        const response = await fetch(`${API_URL}villes`);
        
    } catch (error) {
        
    }
}




export const meteoReducer = meteoSlice.reducer;
export const { setActuel, setForecast, setVilles, ajtVille, supprVille, ouvreVille, setUnits } = meteoSlice.actions; 