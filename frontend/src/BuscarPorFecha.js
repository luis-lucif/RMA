import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

function BuscarPorFecha() {
  const [fecha, setFecha] = useState(new Date());
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    // Formatea la fecha a YYYY-MM-DD
    const fechaFormateada = fecha.toISOString().split('T')[0];

    try {
      const respuesta = await axios.get('http://127.0.0.1:8000/api/clientes/', {
        params: {
          fecha_ingreso: fechaFormateada,
        }
      });
      setResultados(respuesta.data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  return (
    <div>
      <Calendar onChange={setFecha} value={fecha} />
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

export default BuscarPorFecha;