import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FileViewer from 'react-file-viewer'; 


function DetalleCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const respuesta = await axios.get(`http://127.0.0.1:8000/api/clientes/${id}/`);
        setCliente(respuesta.data);
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      }
    };

    obtenerCliente();
  }, [id]);

  if (!cliente) {
    return <div>Cargando...</div>;
  }

  const handleCambiarEstado = async (nuevoEstado) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/reparaciones/${cliente.reparacion.id}/`, {
        estado: nuevoEstado,
      });
      setCliente({
        ...cliente,
        reparacion: {
          ...cliente.reparacion,
          estado: nuevoEstado
        }
      });
    } catch (error) {
      console.error('Error al cambiar el estado de la reparación:', error);
    }
  };

  const obtenerTipoArchivo = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image';
      case 'pdf':
        return 'pdf';
      default:
        return 'unknown'; 
    }
  };

  return (
    <div>
      <Typography variant="h5">{cliente.nombre_completo}</Typography>
      <List>
        {/* ... otros campos del cliente ... */}
        {cliente.reparacion && (
          <ListItem>
            <ListItemText primary="Estado de la reparación" />
            <Select
              value={cliente.reparacion.estado}
              onChange={(e) => handleCambiarEstado(e.target.value)}
            >
              <MenuItem value="en_reparacion">En reparación</MenuItem>
              <MenuItem value="terminado">Terminado</MenuItem>
              <MenuItem value="para_retirar">Para retirar</MenuItem>
            </Select>
          </ListItem>
        )}
      </List>

      {/* Mostrar la factura */}
      {cliente.factura_url && (
        <div>
          <Typography variant="h6">Factura:</Typography>
          <FileViewer
            fileType={obtenerTipoArchivo(cliente.factura_url)} 
            filePath={cliente.factura_url}
            errorComponent={<Typography variant="body2" color="error">Error al cargar el archivo</Typography>} 
          />
        </div>
      )}

      {/* Mostrar la foto del producto */}
      {cliente.foto_producto_url && (
        <div>
          <Typography variant="h6">Foto del producto:</Typography>
          <FileViewer
            fileType={obtenerTipoArchivo(cliente.foto_producto_url)} 
            filePath={cliente.foto_producto_url}
            errorComponent={<Typography variant="body2" color="error">Error al cargar el archivo</Typography>} 
          />
        </div>
      )}
    </div>
  );
}

export default DetalleCliente;