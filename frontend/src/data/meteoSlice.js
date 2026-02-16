import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://localhost:4000/";

const initialState = {
    actuel: {},
    forecast: [],
    villes: [{ id: "1", ville: 'Tangier', pays: 'MA' }],
    actuelVille: {
        id: "1"
    },
    units: {
        type: "metric"
    },
    aLoading: true,
    fLoading: true,
    error: ''
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
            state.actuelVille = { id: action.payload };
        },
        setUnits(state, action) {
            state.units = { type: action.payload };
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
});

// Villes
export const fetchVilles = () => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}villes`);
        const data = await response.json();
        const list = Array.isArray(data) ? data : [];
        dispatch(setVilles(list));
    } catch (error) {
        console.error('error', error);
    }
}

export const fetchActuelVille = () => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}actuelVille`);
        const data = await response.json();
        const id = data.id ? data.id : null;
        dispatch(setActuelVille(id));
    } catch (error) {
        console.error('erreur', error);
    }
}

export const fetchUnits = () => async (dispatch) => {
    try {
        const response = await fetch(`${API_URL}units`);
        const data = await response.json();
        const type = data.type ? data.type : null;
        dispatch(setUnits(type));
    } catch (error) {
        console.error('erreur', error);
    }
}

// fetch data from openweathermap

export const fetchMeteoData = () => async (dispatch, getState) => {
    const { actuelVille, units, villes } = getState().meteo;
    const ville = villes.find(v => v.id === actuelVille.id);
    if (!ville) {
        console.error("Ville non trouvée");
        return;
    }
    const unitsX = units.type;


    const fetchActuel = async () => {
        try {
            const res = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: ville.ville,
                        units: unitsX,
                        lang: "fr",
                        appid: process.env.REACT_APP_OPENWEATHER_API_KEY
                    }
                }
            );
            dispatch(setActuel(res.data));
        } catch (err) {
            console.error("Error fetching weather data:", err);
            dispatch(setError("Error fetching weather data."))
        }
    };

    const fetchForecast = async () => {
        try {
            const res2 = await axios.get(
                "https://api.openweathermap.org/data/2.5/forecast",
                {
                    params: {
                        q: ville.ville,
                        units: unitsX,
                        lang: "fr",
                        appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
                    }
                }
            )
            dispatch(setForecast(res2.data.list));
        } catch (err) {
            console.error("Error fetching weather data: ", err);
            dispatch(setError("Error fetching weather data."))
        }
    }

    fetchActuel();
    fetchForecast();
};

export const ouvreVille = (id) => async (dispatch) => {
    try {
        await axios.put(`${API_URL}actuelVille`, { id });
        dispatch(fetchActuelVille());
    } catch (error) {
        console.error('error: ', error);
    }
}

export const ajtVille = (newVille) => async (dispatch) => {
    try {
        await axios.post(`${API_URL}villes`, newVille);

        dispatch(fetchVilles());
    } catch (error) {
        console.error('error: ', error);
    }
}

export const suppVille = (idVille) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}villes/${idVille}`);

        dispatch(fetchVilles());
    } catch (error) {
        console.error('error: ', error);
    }
}

export const changeUnit = (type) => async (dispatch) => {
    try {
        await axios.put(`${API_URL}units`, { type });
        dispatch(fetchUnits())
    } catch (error) {
        console.error('error', error);
    }
}

export const initialeFetch = () => async (dispatch) => {
    await dispatch(fetchActuelVille());
    await dispatch(fetchVilles());
    await dispatch(fetchUnits());
    await dispatch(fetchMeteoData());

};


export const meteoReducer = meteoSlice.reducer;
export const { setActuel, setForecast, setVilles, setActuelVille, setUnits, setError } = meteoSlice.actions; 