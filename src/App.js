import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Settings from './component/Settings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialeFetch, setError } from './data/meteoSlice';
import Alert from './component/Alert';


function App() {
    const dispatch = useDispatch()
    const alert = useSelector(state => state.meteo.error);

    useEffect(()=> {
        dispatch(initialeFetch())
    }, [dispatch])

    const close = () => {
        dispatch(setError(''))
    }
    
    return (
        <div className="App">
            {alert && <Alert
                message={alert}
                type={'error'}
                onClose={close}
                duration={3000}
            />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </div>
  );
}

export default App;
