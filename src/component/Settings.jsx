import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import { ajtVille, changeUnit, ouvreVille, setError, suppVille } from "../data/meteoSlice";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Settings() {
    const villes = useSelector(state => state.meteo.villes);
    const units = useSelector(state => state.meteo.units.type);
    const [selectedUnit, setSelectedUnit] = useState(units);
    const dispatch = useDispatch();
    const [addInp, setAddInp] = useState(false);
    const [loading, setLoading] = useState(false);
    const nvVille = useRef('');

    const navigate = useNavigate();

    const ajtV = async () => {
        const ville = nvVille.current.value;
        
        if (ville.trim()) {
            setLoading(true);
            try {
                const res = await axios.get(
                    "https://api.openweathermap.org/data/2.5/weather",
                    {
                        params: {
                            q: ville.trim(),
                            units: selectedUnit,
                            lang: "fr",
                            appid: "89a3d21b7512a3590f5e7e33f2269119"
                        }
                    }
                );
                
                const country = res.data.sys.country;
                const nvV = {
                    id: String(Date.now()),
                    ville: ville.trim(),
                    pays: country,
                    ouvre: false
                };
                
                dispatch(ajtVille(nvV));
                nvVille.current.value = '';
                setAddInp(false);
            } catch (err) {
                console.error("Error fetching weather data:", err);
                dispatch(setError("Ville non trouvée. Vérifiez le nom et réessayez."));
            } finally {
                setLoading(false);
            }
        }
    }

    const ouvrirVille = (id) => {
        dispatch(ouvreVille(id));
        navigate('/');
    }

    useEffect(() => {
        dispatch(changeUnit(selectedUnit));
    }, [selectedUnit, dispatch]);

    useEffect(()=>{
        if (addInp){
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
                    <>
                        <input 
                            type="text" 
                            placeholder="Saisissez le nom de la nouvelle ville" 
                            className="settings-city-input" 
                            ref={nvVille}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                        <div className="settings-ajt-annul">
                            <button 
                                className="first-child" 
                                onClick={() => setAddInp(false)}
                                disabled={loading}
                            >
                                Annuler
                            </button>
                            <button 
                                onClick={ajtV}
                                disabled={loading}
                            >
                                {loading ? 'Ajout...' : 'Ajouter'}
                            </button>
                        </div>
                    </>
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