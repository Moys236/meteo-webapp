import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import Content from './Content';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';

function Home () {
    const dispatch = useDispatch();
    const idVille = useSelector(state => state.meteo.actuelVille.id);
    const villes = useSelector(state => state.meteo.villes);
    const actuelVille = villes.find(v => v.id === idVille);

    console.log(typeof idVille, ' ', idVille);
    console.log(villes);
    console.log(actuelVille);

        
    const [ville, setVille] = useState(actuelVille.ville);


    // useEffect(() => {
    //     // const idVille = useSelector(state => state.meteo.actuelVille.id);
    //     // const villes = useSelector(state => state.meteo.villes);
    //     const actuelVille = villes.find(v => v.id === idVille);
    //     if (actuelVille) {
    //        setVille(actuelVille.ville);
    //     }
    // }, [villes]);


    // useEffect(() => {
        
    // }, [ville, dispatch]);
    return (
        <div className="export-wrapper">
            <Sidebar />
            <Content />
        </div>
    )
}

export default Home;