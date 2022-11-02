import './App.css'
import {Route, Routes} from 'react-router-dom'

import Box from '@mui/material/Box'

import Navbar from './components/Navbar'
import Errorpage from './components/Errorpage'
import Home from './components/Home'
import Rename from './components/Rename'
import Create from './components/Create'
import Remove from './components/Remove'
import Lock from './components/Lock'


function App() {
  return (
    <Box>
    
      <Navbar/>

      <Routes>
        <Route  exact path="/" element={<Home />} />
        <Route  exact path="/Rename" element={<Rename />} />
        <Route  exact path="/Create" element={<Create />} />
        <Route  exact path="/Remove" element={<Remove />} />
        <Route  exact path="/Lock" element={<Lock />} />
        <Route  exact path="*" element={<Errorpage />} />
      </Routes>
    
    </Box>
  );
}

export default App;
