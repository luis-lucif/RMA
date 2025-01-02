import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function BuscarPorTelefono() {
  const [telefono, setTelefono] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    try {
      const respuesta = await axios.get('http://127.0.0.1:8000/api/clientes/', {
        params: {
          telefono: telefono, // Envía el parámetro 'telefono' a la API
        }
      });
      setResultados(respuesta.data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBuscar();
    }
  };

  return (
    <div>
      <TextField
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <Button variant="contained" color="primary" onClick={handleBuscar}>
        Buscar
      </Button>

      {/* Mostrar los resultados de la búsqueda */}
      <List>
        {resultados.map(cliente => (
          <React.Fragment key={cliente.id}>
            <ListItem>
              <ListItemText
                primary={cliente.nombre_completo}
                secondary={cliente.telefono}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default BuscarPorTelefono;