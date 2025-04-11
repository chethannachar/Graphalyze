import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './App.jsx';
import Data from './data.jsx';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/data' element={<Data />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;