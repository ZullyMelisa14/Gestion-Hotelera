"use client";
import "../styles/reserva.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { agregarReserva, actualizarEstadoHabitacion } from "@/utils/peticiones";

export default function Reserva({ habitacion }) {
  const [mensaje, setMensaje] = useState("");
  const [pagoValido, setPagoValido] = useState(false);
  const router = useRouter();
  const facturaRef = useRef();

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

    const codigo = Date.now().toString();

    try {
      await agregarReserva({
        ...form,
        codigo,
        numero_habitacion: habitacion.numero,
        id_habitacion: habitacion.id,
        fechallegada: form.fechaLlegada,   // <-- asegúrate de que existan
        fechasalida: form.fechaSalida      // <-- asegúrate de que existan
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

  const handleDescargarFactura = () => {
    const printContents = facturaRef.current.innerHTML;
    const win = window.open("", "", "height=700,width=900");
    win.document.write("<html><head><title>Factura de Pago</title>");
    win.document.write('<style>body{font-family:sans-serif;}h2{color:#1976d2;}table{width:100%;border-collapse:collapse;}th,td{border:1px solid #b0bec5;padding:8px;}th{background:#eaf6fb;}</style>');
    win.document.write("</head><body>");
    win.document.write(printContents);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
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
              minLength={2}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              title="Solo letras y espacios"
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
              minLength={2}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              title="Solo letras y espacios"
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
              pattern="^[0-9]{7,15}$"
              title="Solo números, entre 7 y 15 dígitos"
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
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
              title="Debe contener un @ y un dominio válido"
            />
          </div>
          <div>
            <label>Tipo de Documento</label><span className="required">*</span>
            <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} required>
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
              minLength={5}
              pattern="^[A-Za-z0-9]+$"
              title="Solo letras y números, mínimo 5 caracteres"
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
                    pattern={
                      input.name === "numeroTarjeta" ? "^[0-9]{16}$" :
                      input.name === "cvvTarjeta" ? "^[0-9]{3,4}$" : undefined
                    }
                    title={
                      input.name === "numeroTarjeta" ? "Debe tener 16 dígitos numéricos" :
                      input.name === "cvvTarjeta" ? "Debe tener 3 o 4 dígitos numéricos" : undefined
                    }
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

          <div className="buttonConfirmar">
            <button type="submit">Confirmar</button>
          </div>
          <div>
            <button type="button" className="buttonCancelar" onClick={() => window.location.reload()}>Cancelar</button>
          </div>
          <div style={{ marginTop: 20 }}>
            <button type="button" onClick={handleDescargarFactura} disabled={!pagoValido}>
              Descargar factura
            </button>
          </div>
        </div>
      </form>

      {/* Factura oculta para imprimir/descargar */}
      <div style={{ display: "none" }}>
        <div ref={facturaRef}>
          <h2>Factura de Pago</h2>
          <p><b>Nombre:</b> {form.nombre} {form.apellido}</p>
          <p><b>Documento:</b> {form.tipoDocumento} {form.numeroDocumento}</p>
          <p><b>Correo:</b> {form.correo}</p>
          <p><b>Teléfono:</b> {form.telefono}</p>
          <p><b>Habitación:</b> {habitacion?.numero}</p>
          <p><b>Fecha de llegada:</b> {form.fechaLlegada}</p>
          <p><b>Fecha de salida:</b> {form.fechaSalida}</p>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>${subtotal}</td>
              </tr>
              <tr>
                <td>Descuento</td>
                <td>$0</td>
              </tr>
              <tr>
                <td><b>Total</b></td>
                <td><b>${total}</b></td>
              </tr>
              <tr>
                <td>Pago</td>
                <td>${form.pago}</td>
              </tr>
              <tr>
                <td>Cambio</td>
                <td>${cambio}</td>
              </tr>
              <tr>
                <td>Método de pago</td>
                <td>{form.metodoPago === "tarjeta" ? "Tarjeta de Crédito" : "Efectivo"}</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 24, color: "#1976d2" }}>¡Gracias por su reserva!</p>
        </div>
      </div>
    </div>
  );
}
