import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route
import Dashboard from './Dashboard';
import DetalleCliente from './DetalleCliente'; // Importa DetalleCliente

function App() {
  return (
    <BrowserRouter> {/* Envuelve tu aplicación con BrowserRouter */}
      <Routes> {/* Define las rutas */}
        <Route path="/" element={<Dashboard />} /> {/* Ruta para el Dashboard */}
        <Route path="/detalle-cliente/:id" element={<DetalleCliente />} /> {/* Ruta para el detalle del cliente */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
