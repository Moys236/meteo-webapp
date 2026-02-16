import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import { ajtVille, changeUnit, ouvreVille, setError, suppVille } from "../data/meteoSlice";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import citiesData from "../data/cities-optimized.json";
import Authcontext from "../data/authContext";

function Settings() {
    const { isAuth, loadingToken, verifyToken } = useContext(Authcontext);
    const navigate = useNavigate();

    useEffect(()=> {
        verifyToken();
    })
    useEffect(() => {
        if (!isAuth && !loadingToken) {
            navigate('/login');
        }
    }, [isAuth, navigate, loadingToken]);
    
    const villes = useSelector(state => state.meteo.villes);
    const units = useSelector(state => state.meteo.units.type);
    const [selectedUnit, setSelectedUnit] = useState(units);
    const dispatch = useDispatch();
    const [addInp, setAddInp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const nvVille = useRef('');


    const ajtV = async (suggestedCity = null) => {
        const ville = (typeof suggestedCity === 'string') ? suggestedCity : inputValue;

        if (ville.trim()) {
            setLoading(true);
            try {
                const cityName = ville.includes('|') ? ville.split('|')[0] : ville.trim();

                const res = await axios.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    {
                        params: {
                            q: cityName,
                            units: selectedUnit,
                            lang: "fr",
                            appid: process.env.REACT_APP_OPENWEATHER_API_KEY
                        }
                    }
                );

                const country = res.data.sys.country;
                const nvV = {
                    id: String(Date.now()),
                    ville: res.data.name,
                    pays: country,
                    ouvre: false
                };

                dispatch(ajtVille(nvV));
                setInputValue('');
                setSuggestions([]);
                setAddInp(false);
            } catch (err) {
                console.error("Error fetching weather data:", err);
                dispatch(setError("Ville non trouvée. Vérifiez le nom et réessayez."));
            } finally {
                setLoading(false);
            }
        }
    }

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);

        if (val.length > 1) {
            const filtered = citiesData
                .filter(c => c.toLowerCase().startsWith(val.toLowerCase()))
                .slice(0, 10);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }

    const selectSuggestion = (s) => {
        const [name] = s.split('|');
        setInputValue(name);
        setSuggestions([]);
        ajtV(s);
    }

    const ouvrirVille = (id) => {
        dispatch(ouvreVille(id));
        navigate('/');
    }

    useEffect(() => {
        dispatch(changeUnit(selectedUnit));
    }, [selectedUnit, dispatch]);

    useEffect(() => {
        if (addInp) {
            nvVille.current.focus();
        }
    }, [addInp])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            ajtV();
        }
    }

    return (
        <>
            <Link to={'/'} className="home-link">←Accueil</Link>
            <div className="settings-container">
                <h1 className="section-setting-title">Vos Villes</h1>

                {villes.map(v => (
                    <div className="settings-city-item" key={v.id}>
                        <div className="settings-city-info" onClick={() => ouvrirVille(v.id)}>
                            <span className="settings-city-name">{v.ville}</span>
                            <span className="settings-city-desc">{v.pays}</span>
                        </div>
                        <div
                            className="settings-delete-icon"
                            onClick={() => dispatch(suppVille(v.id))}
                        >
                            <Icon icon={'lucide:trash'} />
                        </div>
                    </div>
                ))}

                {addInp && (
                    <div className="settings-add-wrapper">
                        <input
                            type="text"
                            placeholder="Saisissez le nom de la nouvelle ville"
                            className="settings-city-input"
                            ref={nvVille}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />

                        {suggestions.length > 0 && (
                            <div className="settings-suggestions">
                                {suggestions.map((s, idx) => {
                                    const [name, country] = s.split('|');
                                    return (
                                        <div
                                            key={idx}
                                            className="suggestion-item"
                                            onClick={() => selectSuggestion(s)}
                                        >
                                            <span className="suggestion-name">{name}</span>
                                            <span className="suggestion-country">{country}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <div className="settings-ajt-annul">
                            <button
                                className="first-child"
                                onClick={() => {
                                    setAddInp(false);
                                    setInputValue('');
                                    setSuggestions([]);
                                }}
                                disabled={loading}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => ajtV()}
                                disabled={loading}
                            >
                                {loading ? 'Ajout...' : 'Ajouter'}
                            </button>
                        </div>
                    </div>
                )}

                {!addInp && (
                    <div
                        className="settings-ajt-city-btn"
                        onClick={() => setAddInp(true)}
                    >
                        <Icon icon={'lucide:plus'} />
                    </div>
                )}

                <h1 className="section-setting-title">Unité</h1>
                <RadioInput
                    name="temperature"
                    value="metric"
                    label="C° - km/h"
                    checked={selectedUnit === 'metric'}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                />
                <RadioInput
                    name="temperature"
                    value="imperial"
                    label="F° - mph"
                    checked={selectedUnit === 'imperial'}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                />
            </div>
        </>
    )
}

export default Settings;

const RadioInput = ({ name, value, label, checked, onChange }) => {
    return (
        <label className="radio-container">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="radio-input"
            />
            <span className="radio-label">{label}</span>
            <span className="radio-custom"></span>
        </label>
    );
};