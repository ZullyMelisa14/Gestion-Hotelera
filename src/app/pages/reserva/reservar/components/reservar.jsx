"use client";
import "../styles/reserva.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { agregarReserva } from "@/utils/peticiones";

export default function Reserva({ habitacion }) {
  const [mensaje, setMensaje] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaLlegada: "",
    fechaSalida: "",
    metodoPago: "",
    pago: "",
    total: habitacion?.precio || 0, // Usar el precio de la habitación
  });
  const [pagoValido, setPagoValido] = useState(false);
  const router = useRouter();

  // Si cambia la habitación, actualiza el precio automáticamente
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      total: habitacion?.precio || 0,
    }));
  }, [habitacion]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirmarPago = (e) => {
    e.preventDefault();
    if (form.metodoPago && Number(form.pago) >= Number(form.total)) {
      setPagoValido(true);
      setMensaje("¡Pago confirmado! Ahora puedes agregar el huésped.");
    } else {
      setPagoValido(false);
      setMensaje("El pago debe ser igual o mayor al total y debes seleccionar un método de pago.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pagoValido) {
      setMensaje("Debes confirmar el pago antes de agregar el huésped.");
      return;
    }
    try {
      await agregarReserva(form);
      setMensaje("¡Reserva guardada exitosamente!");
      setForm({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        tipoDocumento: "",
        numeroDocumento: "",
        fechaLlegada: "",
        fechaSalida: "",
        metodoPago: "",
        pago: "",
        total: 100,
      });
      setPagoValido(false);
    } catch (error) {
      setMensaje("Error al guardar la reserva");
    }
  };

  const handleVolver = () => {
    router.push("/pages/dashboard");
  };

  return (
    <div className="divReserva">
      <div className="container">
        <div className="title">
          <h1>Datos Personales</h1>
        </div>
        <form className="formularioDP" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre</label>
            <span className="required">*</span>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido</label>
            <span className="required">*</span>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono</label>
            <span className="required">*</span>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="correo">Correo Electrónico</label>
            <span className="required">*</span>
            <input
              type="email"
              id="correo"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tipoDocumento">Tipo de Documento</label>
            <span className="required">*</span>
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={form.tipoDocumento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="cedula">Cédula</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="tarjetaIdentidad">Tarjeta de Identidad</option>
            </select>
          </div>
          <div>
            <label htmlFor="numeroDocumento">Número de Documento</label>
            <span className="required">*</span>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              value={form.numeroDocumento}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="fechaLlegada">Fecha de Llegada</label>
            <span className="required">*</span>
            <input
              type="date"
              id="fechaLlegada"
              name="fechaLlegada"
              value={form.fechaLlegada}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="fechaSalida">Fecha de Salida</label>
            <span className="required">*</span>
            <input
              type="date"
              id="fechaSalida"
              name="fechaSalida"
              value={form.fechaSalida}
              onChange={handleChange}
              required
            />
          </div>
          <div className="buttonContainer">
            <button type="submit" disabled={!pagoValido}>
              Agregar huésped
            </button>
            <button
              type="button"
              onClick={handleVolver}
              style={{ marginLeft: 10 }}
            >
              Volver al dashboard
            </button>
          </div>
        </form>
        {mensaje && (
          <p style={{ color: mensaje.startsWith("¡") ? "green" : "red" }}>
            {mensaje}
          </p>
        )}
      </div>
      <form className="formularioMD" onSubmit={handleConfirmarPago}>
        <div className="containerMDP">
          <div className="title">
            <h1>Metodos de pago</h1>
          </div>
          <div>
            <input
              type="radio"
              name="metodoPago"
              value="tarjeta"
              checked={form.metodoPago === "tarjeta"}
              onChange={handleChange}
              required
            />
            <label>Tarjeta de Crédito</label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="metodoPago"
                value="efectivo"
                checked={form.metodoPago === "efectivo"}
                onChange={handleChange}
              />
              Efectivo
            </label>
          </div>
          <div>
            <h2>Subtotal: ${habitacion?.precio || 0}</h2>
            <h2>Descuento: $0</h2>
            <h2>Total: ${habitacion?.precio || 0}</h2>
          </div>
          <hr />
          <div>
            <label>Pago:</label>
            <input
              type="number"
              name="pago"
              value={form.pago}
              onChange={handleChange}
              min={form.total}
              required
            />
            <h2>
              Cambio: ${form.pago ? Number(form.pago) - Number(form.total) : 0}
            </h2>
          </div>
          <div className="buttonConfirmar">
            <button type="submit">Confirmar</button>
          </div>
          <div>
            <button
              type="button"
              className="buttonCancelar"
              onClick={() => window.location.reload()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}