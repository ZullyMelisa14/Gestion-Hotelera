"use client";
import "../styles/reserva.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { agregarReserva, actualizarEstadoHabitacion } from "@/utils/peticiones";

export default function Reserva({ habitacion }) {
  const [mensaje, setMensaje] = useState("");
  const [pagoValido, setPagoValido] = useState(false);
  const router = useRouter();

  const inicialForm = {
    nombre: "", apellido: "", telefono: "", correo: "",
    tipoDocumento: "", numeroDocumento: "", fechaLlegada: "", fechaSalida: "",
    metodoPago: "", pago: "", total: habitacion?.precio || 0,
    numeroTarjeta: "", nombreTarjeta: "", vencimientoTarjeta: "", cvvTarjeta: "",
  };

  const [form, setForm] = useState(inicialForm);

  // Actualiza el total cuando cambia la habitación
  useEffect(() => {
    setForm(f => ({ ...f, total: habitacion?.precio || 0, pago: "" }));
  }, [habitacion]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleConfirmarPago = (e) => {
    e.preventDefault();
    if (form.metodoPago === "tarjeta" &&
      (!form.numeroTarjeta || !form.nombreTarjeta || !form.vencimientoTarjeta || !form.cvvTarjeta)) {
      setMensaje("Completa todos los datos de la tarjeta.");
      return setPagoValido(false);
    }

    if (form.metodoPago && Number(form.pago) >= Number(form.total)) {
      setMensaje("¡Pago confirmado! Ahora puedes agregar el huésped.");
      return setPagoValido(true);
    }

    setMensaje("El pago debe ser igual o mayor al total y debes seleccionar un método de pago.");
    setPagoValido(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pagoValido) return setMensaje("Debes confirmar el pago antes de agregar el huésped.");

    // Generar código único (puedes usar Date.now o un generador de UUID)
    const codigo = Date.now().toString();

    try {
      await agregarReserva({
        ...form,
        codigo,
        piso: habitacion.piso, // habitacion viene del prop, asegúrate de que tenga el campo piso
        numero_habitacion: habitacion.numero, // si quieres mostrar el número también
      });
      await actualizarEstadoHabitacion(habitacion.id, "Ocupada");
      setMensaje("¡Reserva guardada exitosamente!");
      setForm({ ...inicialForm, total: habitacion?.precio || 0 });
      setPagoValido(false);
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      setMensaje("Error al guardar la reserva");
    }
  };

  const inputsPersonales = [
    { label: "Nombre", name: "nombre", type: "text" },
    { label: "Apellido", name: "apellido", type: "text" },
    { label: "Teléfono", name: "telefono", type: "tel" },
    { label: "Correo Electrónico", name: "correo", type: "email" },
    { label: "Número de Documento", name: "numeroDocumento", type: "text" },
    { label: "Fecha de Llegada", name: "fechaLlegada", type: "date" },
    { label: "Fecha de Salida", name: "fechaSalida", type: "date" },
  ];

  const inputsTarjeta = [
    { label: "Número de tarjeta", name: "numeroTarjeta", type: "text", maxLength: 16 },
    { label: "Nombre en la tarjeta", name: "nombreTarjeta", type: "text" },
    { label: "Vencimiento", name: "vencimientoTarjeta", type: "month" },
    { label: "CVV", name: "cvvTarjeta", type: "password", maxLength: 4 },
  ];

  // Calcular el cambio (vuelto) respecto al precio de la habitación
  const subtotal = habitacion?.precio || 0;
  const total = subtotal; // Si luego tienes descuentos, puedes sumarlos aquí
  const cambio = form.pago ? Math.max(Number(form.pago) - Number(total), 0) : 0;

  console.log("Habitación recibida en Reserva:", habitacion);

  return (
    <div className="divReserva">
      <div className="container">
        <div className="title"><h1>Datos Personales</h1></div>
        <form className="formularioDP" onSubmit={handleSubmit}>
          {inputsPersonales.map(input => (
            <div key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              <span className="required">*</span>
              <input
                {...input}
                id={input.name}
                value={form[input.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div>
            <label>Tipo de Documento</label><span className="required">*</span>
            <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              <option value="cedula">Cédula</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="tarjetaIdentidad">Tarjeta de Identidad</option>
            </select>
          </div>

          <div className="buttonContainer">
            <button type="submit" disabled={!pagoValido}>Agregar huésped</button>
            <button type="button" onClick={() => router.push("/pages/dashboard")} style={{ marginLeft: 10 }}>Volver al dashboard</button>
          </div>
        </form>
        {mensaje && (
          <p style={{ color: mensaje.startsWith("¡") ? "green" : "red", marginLeft: 50 }}>{mensaje}</p>
        )}
      </div>

      <form className="formularioMDP" onSubmit={handleConfirmarPago}>
        <div className="containerMDP">
          <div className="title"><h1>Métodos de Pago</h1></div>

          <div>
            <input type="radio" name="metodoPago" value="tarjeta" checked={form.metodoPago === "tarjeta"} onChange={handleChange} required />
            <label>Tarjeta de Crédito</label>
          </div>
          <div>
            <input type="radio" name="metodoPago" value="efectivo" checked={form.metodoPago === "efectivo"} onChange={handleChange} />
            <label>Efectivo</label>
          </div>

          {form.metodoPago === "tarjeta" && (
            <div className="tarjeta-form" style={{ margin: "15px 0" }}>
              {inputsTarjeta.map(input => (
                <div key={input.name}>
                  <label>{input.label}</label>
                  <input
                    {...input}
                    value={form[input.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <h2>Subtotal: ${subtotal}</h2>
            <h2>Descuento: $0</h2>
            <h2>Total: ${total}</h2>
          </div>
          <hr />
          <div>
            <label>Pago:</label>
            <input
              type="number"
              name="pago"
              value={form.pago}
              onChange={handleChange}
              min={total}
              required
            />
            <h2>Cambio: ${cambio}</h2>
          </div>

          <div className="buttonConfirmar"><button type="submit">Confirmar</button></div>
          <div><button type="button" className="buttonCancelar" onClick={() => window.location.reload()}>Cancelar</button></div>
        </div>
      </form>
    </div>
  );
}
