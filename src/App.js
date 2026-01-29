import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Settings from './component/Settings';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialeFetch } from './data/meteoSlice';


function App() {
    const dispatch = useDispatch()
    
    
    console.log('test')
    useEffect(()=> {
        dispatch(initialeFetch())
    }, [])
    
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/settings' element={<Settings />} />
            </Routes>
        </div>
  );
}

export default App;
