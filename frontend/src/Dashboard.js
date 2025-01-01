import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FormularioCliente from './FormularioCliente';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
});

function Dashboard() {
  const classes = useStyles();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleAgregarCliente = () => {
    setMostrarFormulario(true);
  };

  const handleClienteAgregado = (nuevoCliente) => {
    setMostrarFormulario(false);
    // Aquí puedes actualizar la lista de clientes o realizar otras acciones
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {['Agregar Cliente', 'Buscar Cliente'].map((text, index) => (
            <ListItem 
              button 
              key={text} 
              onClick={index === 0 ? handleAgregarCliente : null}
              sx={{
                '&:hover': { 
                  backgroundColor: 'rgba(0, 0, 0, 0.04)' 
                }
              }}
            >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        {mostrarFormulario && <FormularioCliente onClienteAgregado={handleClienteAgregado} />} 
      </main>
    </div>
  );
}

export default Dashboard;