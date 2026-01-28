import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import { ajtVille, ouvreVille, supprVille } from "../data/meteoSlice";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";


function Settings() {
    const villes = useSelector(state => state.meteo.villes);
    const dispatch = useDispatch();
    const [addInp, setAddInp] = useState(false);
    const nvVille = useRef('');

    const navigate = useNavigate();

    const ajtV = () => {
        const ville = nvVille.current.value;
        if (ville.trim()){
            const nvV = {
                id: Date.now(),
                ville : ville, 
                pays: '-', 
                ouvre: false
            } ;
            
            dispatch(ajtVille(nvV));
            
            nvVille.current.value = '';
            setAddInp(false);
        }
    }

    const ouvrirVille = (id)=> {
        dispatch(ouvreVille(id));
        navigate('/');
    }

    return (
        <>
        <Link to={'/'} className="home-link">←Accueil</Link>
        <div className="settings-container">
            <h1 className="section-setting-title">Votre Villes</h1>
            {villes.map(v => (
                <div className={"settings-city-item"} key={v.id}>
                    <div className="settings-city-info"  onClick={()=>ouvrirVille(v.id)}>
                        <span className="settings-city-name">{v.ville}</span>
                        <span className="settings-city-desc">{v.pays}</span>
                    </div>
                    <div className="settings-delete-icon" onClick={()=> dispatch(supprVille(v.id))} >
                        <Icon icon={'lucide:trash'} />
                    </div>
                </div>
            ))}
            {addInp && ( 
                <>
                <input type="text" placeholder="Saissez le nom du nouvelle ville" className="settings-city-input" ref={nvVille} />
                <div className="settings-ajt-annul">
                    <button className="first-child" onClick={()=>setAddInp(false)} >annuler</button>
                    <button onClick={ajtV}>ajouter</button>
                </div>
                </>
            )}

            {!addInp && <div className="settings-ajt-city-btn" onClick={()=>setAddInp(true)}>
                <Icon icon={'lucide:plus'} />
            </div>}
        </div>
        </>
    )
}

export default Settings;