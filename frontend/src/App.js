import './App.css';
import './ResponsiveApp.css';
import { Routes, Route, BrowserRouter, Form } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import DataEntry from './components/DataEntry';

import MegaForm from './components/MegaForm';
import { useState } from 'react';
import ResultPage from './components/ResultPage';
import StLogin from './components/StLogin';


function App() {
  
  return (
    
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="https://cyphers-critique.onrender.com/" element={<StLogin />} />
            <Route path="https://cyphers-critique.onrender.com/admin-login" element={<AdminLogin />} />
            <Route path="https://cyphers-critique.onrender.com/admin-page" element={<AdminPage />} />
            <Route path="https://cyphers-critique.onrender.com/form" element={<MegaForm />} />

            <Route path="https://cyphers-critique.onrender.com/data-entry" element={<DataEntry />} />
            <Route path="https://cyphers-critique.onrender.com/result" element={<ResultPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;




