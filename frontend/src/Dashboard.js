import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from '@mui/icons-material/Build'; // Importa el icono para "Estado"
import FormularioCliente from "./FormularioCliente";

// Importa los componentes para cada tipo de búsqueda
import BuscarPorNombre from "./BuscarPorNombre";
import BuscarPorTelefono from "./BuscarPorTelefono";
import BuscarPorFecha from "./BuscarPorFecha";
import BuscarPorProducto from "./BuscarPorProducto";

const useStyles = makeStyles({
  root: {
    display: "flex",
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
  nested: {
    paddingLeft: 40,
  },
});

function Dashboard() {
  const classes = useStyles();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarBusquedaNombre, setMostrarBusquedaNombre] = useState(false);
  const [mostrarBusquedaTelefono, setMostrarBusquedaTelefono] = useState(false);
  const [mostrarBusquedaFecha, setMostrarBusquedaFecha] = useState(false);
  const [mostrarBusquedaProducto, setMostrarBusquedaProducto] = useState(false);
  const [openBusqueda, setOpenBusqueda] = useState(false);
  // Estado para controlar el submenú de "Estado"
  const [openEstado, setOpenEstado] = useState(false);

  const handleAgregarCliente = () => {
    setMostrarFormulario(true);
    setMostrarBusquedaNombre(false);
    setMostrarBusquedaTelefono(false);
    setMostrarBusquedaFecha(false);
    setMostrarBusquedaProducto(false);
  };

  const handleClickBusqueda = () => {
    setOpenBusqueda(!openBusqueda);
  };

  const handleClickEstado = () => {
    setOpenEstado(!openEstado);
  };

  const handleClienteAgregado = (nuevoCliente) => {
    setMostrarFormulario(false);
    // Aquí puedes actualizar la lista de clientes o realizar otras acciones
  };

  // Funciones para mostrar cada formulario de búsqueda
  const handleBuscarPorNombre = () => {
    setMostrarFormulario(false);
    setMostrarBusquedaNombre(true);
    setMostrarBusquedaTelefono(false);
    setMostrarBusquedaFecha(false);
    setMostrarBusquedaProducto(false);
  };

  const handleBuscarPorTelefono = () => {
    setMostrarFormulario(false);
    setMostrarBusquedaNombre(false);
    setMostrarBusquedaTelefono(true);
    setMostrarBusquedaFecha(false);
    setMostrarBusquedaProducto(false);
  };

  const handleBuscarPorFecha = () => {
    setMostrarFormulario(false);
    setMostrarBusquedaNombre(false);
    setMostrarBusquedaTelefono(false);
    setMostrarBusquedaFecha(true);
    setMostrarBusquedaProducto(false);
  };

  const handleBuscarPorProducto = () => {
    setMostrarFormulario(false);
    setMostrarBusquedaNombre(false);
    setMostrarBusquedaTelefono(false);
    setMostrarBusquedaFecha(false);
    setMostrarBusquedaProducto(true);
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
          <ListItem button onClick={handleAgregarCliente}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar Cliente" />
          </ListItem>

          <ListItem button onClick={handleClickBusqueda}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar Cliente" />
            {openBusqueda ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBusqueda} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button="button"
                className={classes.nested}
                onClick={handleBuscarPorNombre}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Buscar por nombre" />
              </ListItem>
              <ListItem
                button="button"
                className={classes.nested}
                onClick={handleBuscarPorTelefono}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Buscar por teléfono" />
              </ListItem>
              <ListItem
                button="button"
                className={classes.nested}
                onClick={handleBuscarPorFecha}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Buscar por fecha" />
              </ListItem>
              <ListItem
                button="button"
                className={classes.nested}
                onClick={handleBuscarPorProducto}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Buscar por producto" />
              </ListItem>
            </List>
          </Collapse>
          {/* Estado con submenú */}
          <ListItem button onClick={handleClickEstado}>
            <ListItemIcon>
              <BuildIcon /> {/* Icono para "Estado" */}
            </ListItemIcon>
            <ListItemText primary="Estado" />
            {openEstado ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEstado} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Submenú con opciones de estado */}
              <ListItem button className={classes.nested} onClick={() => { /* Lógica para buscar por estado "En reparación" */ }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="En reparación" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => { /* Lógica para buscar por estado "Terminado" */ }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Terminado" />
              </ListItem>
              <ListItem button className={classes.nested} onClick={() => { /* Lógica para buscar por estado "Para retirar" */ }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Para retirar" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
      <main className={classes.content}>
        {mostrarFormulario && (
          <FormularioCliente onClienteAgregado={handleClienteAgregado} />
        )}
        {mostrarBusquedaNombre && <BuscarPorNombre />}
        {mostrarBusquedaTelefono && <BuscarPorTelefono />}
        {mostrarBusquedaFecha && <BuscarPorFecha />}
        {mostrarBusquedaProducto && <BuscarPorProducto />}
      </main>
    </div>
  );
}

export default Dashboard;