import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Settings from './component/Settings';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialeFetch, setError } from './data/meteoSlice';
import Alert from './component/Alert';
import Login from './component/Login';
import Authcontext from './data/authContext';


function App() {
    const [authentified, setAuthentified] = useState(false);
    const [loadingToken, setLoading] = useState(true);
    
    const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthentified(false);
            setLoading(false)
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setAuthentified(true);
            } else {
                setAuthentified(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            setAuthentified(false);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);



    const dispatch = useDispatch()
    const alert = useSelector(state => state.meteo.error);

    useEffect(()=> {
        dispatch(initialeFetch())
    }, [dispatch])

    const close = () => {
        dispatch(setError(''))
    }
    
    return (
        <Authcontext.Provider value={ {isAuth: authentified, loadingToken, verifyToken} } >
            <div className="App">
                {alert && <Alert
                    message={alert}
                    type={'error'}
                    onClose={close}
                    duration={4000}
                />}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </div>
        </Authcontext.Provider>
  );
}

export default App;
