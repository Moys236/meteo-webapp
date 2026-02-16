import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import Content from './Content';
import Sidebar from './Sidebar';
import { useContext, useEffect } from 'react';
import { fetchMeteoData } from '../data/meteoSlice';
import Authcontext from '../data/authContext';
import { useNavigate } from 'react-router-dom';

function Home () {
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
    const dispatch = useDispatch();
    const idVille = useSelector(state => state.meteo.actuelVille.id);

    useEffect(() => {
        dispatch(fetchMeteoData())
    },[idVille, dispatch] )
        
    return (
        <div className="export-wrapper">
            <Sidebar />
            <Content />
        </div>
    )
}

export default Home;