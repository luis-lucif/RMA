import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function DetalleCliente() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

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

  const handleOpenDialog = (imagen) => {
    setImagenSeleccionada(imagen);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Typography variant="h5">{cliente.nombre_completo}</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Teléfono" secondary={cliente.telefono} />
        </ListItem>
        {/* ... otros campos del cliente ... */}
        <ListItem>
          <ListItemText primary="Estado de la reparación" />
          <Chip label={cliente.reparacion.estado} /> 
        </ListItem>
      </List>

      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {cliente.factura_url && (
          <ImageListItem key={cliente.factura_url}>
            <img
              src={`${cliente.factura_url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${cliente.factura_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Factura"
              loading="lazy"
              onClick={() => handleOpenDialog(cliente.factura_url)} 
            />
            <ImageListItemBar
              title="Factura"
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about factura`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        )}
        {cliente.foto_producto_url && (
          <ImageListItem key={cliente.foto_producto_url}>
            <img
              src={`${cliente.foto_producto_url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${cliente.foto_producto_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="Foto del producto"
              loading="lazy"
              onClick={() => handleOpenDialog(cliente.foto_producto_url)} 
            />
            <ImageListItemBar
              title="Foto del producto"
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about foto del producto`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        )}
      </ImageList>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Imagen ampliada</DialogTitle>
        <DialogContent>
          {imagenSeleccionada && (
            <img
              src={imagenSeleccionada}
              alt="Imagen ampliada"
              style={{ maxWidth: '100%', maxHeight: '80vh' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DetalleCliente;