import React, { useState, useEffect } from 'react'; // Esta línea ya importa React
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
  
    useEffect(() => {
      const obtenerClientes = async () => {
        try {
          const respuesta = await axios.get('http://127.0.0.1:8000/api/clientes/');
          setClientes(respuesta.data);
        } catch (error) {
          console.error('Error al obtener clientes:', error);
        }
      };
  
      obtenerClientes();
    }, []);
  
    return (
      <List> 
        {clientes.map(cliente => (
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
    );
  }
  
  export default ListaClientes;