import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles({
  root: {
    "& .MuiTextField-root": {
      margin: "10px 0",
      width: "100%",
    },
  },
});

function FormularioCliente({ onClienteAgregado }) {
  const classes = useStyles();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [factura, setFactura] = useState(null);
  const [fotoProducto, setFotoProducto] = useState(null);
  const [observaciones, setObservaciones] = useState("");
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get(
          "http://127.0.0.1:8000/api/productos/"
        );
        setProductos(respuesta.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre_completo", nombreCompleto);
    formData.append("telefono", telefono);
    formData.append("correo_electronico", correoElectronico);
    formData.append("observaciones", observaciones);
    if (factura) {
      formData.append("factura", factura, factura.name);
    }
    if (fotoProducto) {
      formData.append("foto_producto", fotoProducto, fotoProducto.name);
    }
    if (productoSeleccionado) {
      formData.append("producto", productoSeleccionado.id);
    }

    try {
      const respuesta = await axios.post(
        "http://127.0.0.1:8000/api/clientes/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onClienteAgregado(respuesta.data);

      // Limpiar el formulario después de enviar
      setNombreCompleto("");
      setTelefono("");
      setCorreoElectronico("");
      setFactura(null);
      setFotoProducto(null);
      setObservaciones("");
      setProductoSeleccionado(null);
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      // Aquí puedes agregar manejo de errores, como mostrar un mensaje al usuario
    }
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Nombre Completo"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        required
      />
      <TextField
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <TextField
        label="Correo Electrónico"
        value={correoElectronico}
        onChange={(e) => setCorreoElectronico(e.target.value)}
        type="email"
      />
      <TextField
        label="Observaciones"
        value={observaciones}
        onChange={(e) => setObservaciones(e.target.value)}
        multiline
        rows={4}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={productos}
        getOptionLabel={(option) => option.modelo} 
        value={productoSeleccionado}
        onChange={(event, newValue) => {
          setProductoSeleccionado(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Producto" />}
      />

      <Button variant="contained" component="label" sx={{ mr: 2 }}>
        Subir Factura
        <input
          type="file"
          hidden
          onChange={(e) => setFactura(e.target.files[0])}
        />
      </Button>
      <Button variant="contained" component="label" sx={{ mr: 2 }}>
        Subir Foto de Producto
        <input
          type="file"
          hidden
          onChange={(e) => setFotoProducto(e.target.files[0])}
        />
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "rgb(255, 0, 0)", // Color rojo en RGB
          "&:hover": {
            backgroundColor: "rgb(150, 0, 0)", // Color rojo más oscuro al pasar el mouse
          },
        }}
      >
        Guardar
      </Button>
    </form>
  );
}

export default FormularioCliente;
