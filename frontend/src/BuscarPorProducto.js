import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

function BuscarPorProducto() {
  const [producto, setProducto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    // Obtener la lista de productos de la API
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get('http://127.0.0.1:8000/api/productos/');
        setProductos(respuesta.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  const handleBuscar = async () => {
    try {
      const respuesta = await axios.get('http://127.0.0.1:8000/api/clientes/', {
        params: {
          producto: producto ? producto.id : null, 
        }
      });
      setResultados(respuesta.data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={productos}
        getOptionLabel={(option) => option.modelo} 
        value={producto}
        onChange={(event, newValue) => {
          setProducto(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Producto" />}
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

export default BuscarPorProducto;