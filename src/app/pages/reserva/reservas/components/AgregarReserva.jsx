import { useState } from "react";
import { agregarReserva } from "@/utils/peticiones";

export default function AgregarReserva({ onReservaAgregada, onClose }) {
  const [form, setForm] = useState({
    codigo: "",
    numero_habitacion: "",
    piso: "",
    nombre: "",
    fechallegada: "",
    fechasalida: "",
    estado: "En espera",
    pago: "",
    identificacion: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await agregarReserva(form); // Debes tener esta función en peticiones.js
    if (onReservaAgregada) onReservaAgregada();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="codigo" placeholder="Código de reserva" onChange={handleChange} required />
      <input name="numero_habitacion" placeholder="Número de habitación" onChange={handleChange} required />
      <input name="piso" placeholder="Piso" onChange={handleChange} required />
      <input name="nombre" placeholder="Nombre del huésped" onChange={handleChange} required />
      <input name="fechallegada" type="date" onChange={handleChange} required />
      <input name="fechasalida" type="date" onChange={handleChange} required />
      <input name="pago" placeholder="Pago (ID o referencia)" onChange={handleChange} required />
      <input name="identificacion" placeholder="Identificación" onChange={handleChange} required />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
}