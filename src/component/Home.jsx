import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import Content from './Content';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setActuel, setForecast } from '../data/meteoSlice';

function Home () {
    const dispatch = useDispatch();
    const villes = useSelector(state => state.meteo.villes);

    const villeOuverte = villes.find(v => v.ouvre);
        
    const [ville, setVille] = useState(villeOuverte.ville);


    useEffect(() => {
        const villeOuverte = villes.find(v => v.ouvre);
        if (villeOuverte) {
        setVille(villeOuverte.ville);
        }
    }, [villes, ville]);


    useEffect(() => {
        const fetchActuel = async () => {
        try {
            const res = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                q: ville,
                units: "metric",
                lang: "fr",
                appid: "89a3d21b7512a3590f5e7e33f2269119"
                }
            }
            );
            dispatch(setActuel(res.data));
        } catch (err) {
            console.error("Error fetching weather data:", err);
        }
        };

        const fetchForecast = async () => {
        try {
            const res2 = await axios.get(
            "https://api.openweathermap.org/data/2.5/forecast",
            {
                params: {
                q: ville,
                units: "metric",
                lang: "fr", 
                appid: "89a3d21b7512a3590f5e7e33f2269119",
                }
            }
            )
            dispatch(setForecast(res2.data.list));
        }catch(err) {
            console.error("Error fetching weather data: ", err);
        }
        }
        
        fetchActuel();
        fetchForecast();

        const villeOuverte = villes.find(v => v.ouvre);
        if (villeOuverte) {
        setVille(v => v = villeOuverte.ville);
        }
        
    }, [ville, dispatch]);
    return (
        <div className="export-wrapper">
            <Sidebar />
            <Content />
        </div>
    )
}

export default Home;