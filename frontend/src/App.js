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
            <Route path="/" element={<StLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/form" element={<MegaForm />} />

            <Route path="/data-entry" element={<DataEntry />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;




