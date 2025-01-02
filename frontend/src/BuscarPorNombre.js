import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom'; // Importa Link


function BuscarPorNombre() {
  const [nombre, setNombre] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    try {
      const respuesta = await axios.get('http://127.0.0.1:8000/api/clientes/', {
        params: {
          nombre: nombre,
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
        label="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        onKeyDown={handleKeyDown} // Agrega el event listener
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

      <List>
        {resultados.map(cliente => (
          <React.Fragment key={cliente.id}>
            <ListItem>
              <ListItemText
                primary={cliente.nombre_completo}
                secondary={cliente.telefono}
              />
              <Link to={`/detalle-cliente/${cliente.id}`}> {/* Enlace al detalle del cliente */}
                <Button variant="contained" color="primary">
                  DETALLE
                </Button>
              </Link>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default BuscarPorNombre;