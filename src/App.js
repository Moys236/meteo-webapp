import { Route, Routes } from 'react-router';
import './App.css';
import Home from './component/Home';
import Settings from './component/Settings';


function App() {


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
