import { createSlice } from "@reduxjs/toolkit";

const API_URL_villes = "http://localhost:4000/villes";
const API_URL_units = "http://localhost:4000/units";

const initialState = {
    actuel: {
        "coord": { "lon": -5.8137, "lat": 35.7806 },
        "weather": [{ "id": 801, "main": "Clouds", "description": "peu nuageux", "icon": "02d" }],
        "base": "stations",
        "main": { "temp": 12.64, "feels_like": 11.58, "temp_min": 12.64, "temp_max": 12.64, "pressure": 1015, "humidity": 62, "sea_level": 1015, "grnd_level": 1009 },
        "visibility": 10000,
        "wind": { "speed": 4.12, "deg": 310 },
        "clouds": { "all": 20 },
        "dt": 1769270798,
        "sys": { "type": 1, "id": 2416, "country": "MA", "sunrise": 1769239733, "sunset": 1769276485 },
        "timezone": 3600,
        "id": 2530335,
        "name": "Tanger",
        "cod": 200
    },
    forecast: [
        {
            "dt": 1769277600,
            "main": {
                "temp": 12.3,
                "feels_like": 11.28,
                "temp_min": 11.62,
                "temp_max": 12.3,
                "pressure": 1014,
                "sea_level": 1014,
                "grnd_level": 1011,
                "humidity": 65,
                "temp_kf": 0.68
            }, "weather": [{ "id": 802, "main": "Clouds", "description": "partiellement nuageux", "icon": "03n" }],
            "clouds": { "all": 36 },
            "wind": { "speed": 6.58, "deg": 303, "gust": 9.87 },
            "visibility": 10000,
            "pop": 0.8,
            "sys": { "pod": "n" },
            "dt_txt": "2026-01-24 18:00:00"
        },
        { "dt": 1769288400, "main": { "temp": 12.8, "feels_like": 11.91, "temp_min": 12.8, "temp_max": 12.88, "pressure": 1017, "sea_level": 1017, "grnd_level": 1014, "humidity": 68, "temp_kf": -0.08 }, "weather": [{ "id": 500, "main": "Rain", "description": "légère pluie", "icon": "10n" }], "clouds": { "all": 59 }, "wind": { "speed": 7.77, "deg": 292, "gust": 11.09 }, "visibility": 10000, "pop": 0.26, "rain": { "3h": 0.13 }, "sys": { "pod": "n" }, "dt_txt": "2026-01-24 21:00:00" },
        { "dt": 1769299200, "main": { "temp": 12.21, "feels_like": 11.42, "temp_min": 12.21, "temp_max": 12.21, "pressure": 1021, "sea_level": 1021, "grnd_level": 1015, "humidity": 74, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "légère pluie", "icon": "10n" }], "clouds": { "all": 60 }, "wind": { "speed": 7.39, "deg": 292, "gust": 11.41 }, "visibility": 10000, "pop": 0.66, "rain": { "3h": 0.66 }, "sys": { "pod": "n" }, "dt_txt": "2026-01-25 00:00:00" }
    ],
    villes: [
        { id: 1, ville: 'Tangier', pays: 'MA', ouvre: true },
        { id: 2, ville: 'Tetouan', pays: 'MA', ouvre: false },
        { id: 3, ville: 'larache', pays: 'MA', ouvre: false },
        { id: 4, ville: 'asilah', pays: 'MA', ouvre: false }
    ],
    units: 'metric',
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
        ajtVille(state, action) {
            state.villes.push(action.payload);
        },
        supprVille(state, action) {
            const index = state.villes.findIndex(v => v.id === action.payload)
            state.villes.splice(index, 1);
        },
        ouvreVille(state, action) {
            state.villes.map(v => {
                if (v.id === action.payload) {
                    v.ouvre = true;
                } else {
                    v.ouvre = false;
                };
            })
        },
        setUnits(state, action) {
            state.units = action.payload
        },
        changeUnits(state, action) {
            state.units = action.payload
        }
    },
});




export const meteoReducer = meteoSlice.reducer;
export const { setActuel, setForecast, setVilles, ajtVille, supprVille, ouvreVille, setUnits } = meteoSlice.actions; 