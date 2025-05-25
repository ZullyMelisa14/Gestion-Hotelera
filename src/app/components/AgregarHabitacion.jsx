"use client";
import { useState } from "react";
import { agregarHabitacion } from "@/utils/peticiones";

export default function AgregarHabitacion({ onHabitacionAgregada }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    numero: "",
    tipo: "",
    precio: "",
    capacidad: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await agregarHabitacion({
        numero: form.numero,
        tipo: form.tipo,
        precio: Number(form.precio),
        capacidad: Number(form.capacidad),
      });
      setForm({
        numero: "",
        tipo: "",
        precio: "",
        capacidad: "",
      });
      setMostrarFormulario(false);
      if (onHabitacionAgregada) onHabitacionAgregada();
    } catch (err) {
      setError("Error al agregar habitación");
    }
  };

  return (
    <>
      {mostrarFormulario && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#f9f9f9",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 1000,
            maxWidth: 350,
            width: "90%",
            border: "1px solid #e0e0e0",
            animation: "fadeIn 0.3s",
          }}
        >
          {/* Botón X para cerrar */}
          <button
            onClick={() => setMostrarFormulario(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 16,
              background: "transparent",
              border: "none",
              fontSize: 24,
              color: "#888",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            aria-label="Cerrar"
          >
            ×
          </button>
          <form onSubmit={handleSubmit}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: 24,
                color: "#007bff",
              }}
            >
              Agregar Habitación
            </h2>
            <input
              type="text"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              placeholder="Número"
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Tipo"
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio"
              required
              style={inputStyle}
            />
            <input
              type="number"
              name="capacidad"
              value={form.capacidad}
              onChange={handleChange}
              placeholder="Capacidad"
              required
              style={inputStyle}
            />
            {error && (
              <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px 0",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 10,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Agregar
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setMostrarFormulario(true)}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          fontSize: 32,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        title="Agregar Habitación"
      >
        +
      </button>
    </>
  );
}

// Estilo para los inputs
const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #bdbdbd",
  fontSize: 15,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
  transition: "border 0.2s",
};
