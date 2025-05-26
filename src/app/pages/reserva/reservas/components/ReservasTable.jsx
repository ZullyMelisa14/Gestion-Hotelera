import useReserva from "./useReserva";
import { useEffect, useState, useRef } from "react";
import "../styles/ReservasTable.css";
import { getReservas } from "@/utils/peticiones";

function formatearFecha(fecha) {
  if (!fecha) return "";
  if (typeof fecha === "string") {
    return fecha.split("T")[0];
  }
  if (fecha.toDate) {
    return fecha.toDate().toISOString().split("T")[0];
  }
  return "";
}

export default function ReservasTable() {
  const { reservas, setReservas } = useReserva();
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const tablaRef = useRef();

  useEffect(() => {
    getReservas(setReservas);
  }, [setReservas]);

  useEffect(() => {
    if (busqueda.length === 0) {
      setSugerencias([]);
      return;
    }
    const texto = busqueda.toLowerCase();
    const sugerenciasFiltradas = reservas.filter((reserva) => {
      return (
        reserva.nombre?.toLowerCase().includes(texto) ||
        reserva.apellido?.toLowerCase().includes(texto) ||
        reserva.numeroDocumento?.toLowerCase().includes(texto)
      );
    }).slice(0, 5);
    setSugerencias(sugerenciasFiltradas);
  }, [busqueda, reservas]);

  const reservasFiltradas = reservas.filter((reserva) => {
    const texto = `${reserva.nombre} ${reserva.apellido} ${reserva.numeroDocumento}`.toLowerCase();
    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    let coincideFecha = true;
    const llegada = reserva.fechaLlegada || reserva.fechallegada;
    if (fechaInicio) {
      coincideFecha = coincideFecha && formatearFecha(llegada) >= fechaInicio;
    }
    if (fechaFin) {
      coincideFecha = coincideFecha && formatearFecha(llegada) <= fechaFin;
    }
    return coincideBusqueda && coincideFecha;
  });

  const handleImprimir = () => {
    const printContents = tablaRef.current.innerHTML;
    const win = window.open("", "", "height=700,width=900");
    win.document.write("<html><head><title>Informe de Reservas</title>");
    win.document.write('<link rel="stylesheet" href="ReservasTable.css" />');
    win.document.write("</head><body>");
    win.document.write("<h2>Informe de Reservas</h2>");
    win.document.write(printContents);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
  };

  return (
    <div className="reservas-container">
      <div className="reservas-filtros">
        <div className="reservas-buscador">
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o documento..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="reservas-input"
            autoComplete="off"
          />
          {sugerencias.length > 0 && (
            <ul className="reservas-sugerencias">
              {sugerencias.map((s, idx) => (
                <li
                  key={s.codigo + idx}
                  className="reservas-sugerencia"
                  onClick={() => setBusqueda(`${s.nombre} ${s.apellido}`)}
                  onMouseDown={e => e.preventDefault()}
                >
                  <span className="sugerencia-nombre">{s.nombre} {s.apellido}</span> - <span className="sugerencia-doc">{s.numeroDocumento}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="reservas-fecha">
          <label>Desde</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
            className="reservas-input"
          />
        </div>
        <div className="reservas-fecha">
          <label>Hasta</label>
          <input
            type="date"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
            className="reservas-input"
          />
        </div>
        <button className="reservas-btn-imprimir" onClick={handleImprimir}>
          Imprimir informe
        </button>
      </div>
      <div ref={tablaRef} className="reservas-tabla-wrapper">
        <table className="reservas-tabla">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Número Documento</th>
              <th>Habitación</th>
              <th>Fecha Llegada</th>
              <th>Fecha Salida</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={7} className="reservas-vacio">
                  No hay reservas para mostrar.
                </td>
              </tr>
            ) : reservasFiltradas.map((reserva) => (
              <tr
                key={reserva.codigo}
                className={reserva.estado === "Cancelada" ? "reservas-cancelada" : ""}
                onClick={() => setReservaSeleccionada(reserva)}
              >
                <td>{reserva.codigo}</td>
                <td>{reserva.nombre}</td>
                <td>{reserva.apellido}</td>
                <td>{reserva.numeroDocumento}</td>
                <td>{reserva.numero_habitacion}</td>
                <td>{formatearFecha(reserva.fechaLlegada || reserva.fechallegada)}</td>
                <td>{formatearFecha(reserva.fechaSalida || reserva.fechasalida)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {reservaSeleccionada && (
        <div className="reservas-modal">
          <div className="reservas-modal-content">
            <button className="reservas-modal-cerrar" onClick={() => setReservaSeleccionada(null)}>×</button>
            <h2>Detalles de la Reserva</h2>
            <p><b>Nombre:</b> {reservaSeleccionada.nombre} {reservaSeleccionada.apellido}</p>
            <p><b>Teléfono:</b> {reservaSeleccionada.telefono}</p>
            <p><b>Correo:</b> {reservaSeleccionada.correo}</p>
            <p><b>Tipo Documento:</b> {reservaSeleccionada.tipoDocumento}</p>
            <p><b>Número Documento:</b> {reservaSeleccionada.numeroDocumento}</p>
            <p><b>Método de Pago:</b> {reservaSeleccionada.metodoPago}</p>
            <p><b>Pago:</b> {reservaSeleccionada.pago}</p>
            <p><b>Total:</b> {reservaSeleccionada.total}</p>
            <p><b>Habitación:</b> {reservaSeleccionada.numero_habitacion}</p>
            <p><b>ID Habitación:</b> {reservaSeleccionada.id_habitacion}</p>
            <p><b>Fecha Llegada:</b> {formatearFecha(reservaSeleccionada.fechaLlegada || reservaSeleccionada.fechallegada)}</p>
            <p><b>Fecha Salida:</b> {formatearFecha(reservaSeleccionada.fechaSalida || reservaSeleccionada.fechasalida)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
