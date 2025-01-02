import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



function BuscarCliente() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [producto, setProducto] = useState(null);
  const [productos, setProductos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [fecha, setFecha] = useState(new Date());

  useEffect(() => {
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
    const fechaFormateada = fecha.toISOString().split('T')[0];

    try {
      const respuesta = await axios.get('http://127.0.0.1:8000/api/clientes/', {
        params: {
          nombre: nombre,
          telefono: telefono,
          producto: producto ? producto.id : null,
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
      <div> 
        <TextField 
          label="Nombre" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
        <TextField 
          label="Teléfono" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
        />
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
        <Calendar 
          onChange={setFecha} 
          value={fecha} 
        />
        <Button variant="contained" color="primary" onClick={handleBuscar}>
          Buscar
        </Button>
      </div>

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

export default BuscarCliente;