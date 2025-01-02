import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Dashboard from './Dashboard';
import DetalleCliente from './DetalleCliente'; 

function App() {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/detalle-cliente/:id" element={<DetalleCliente />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;