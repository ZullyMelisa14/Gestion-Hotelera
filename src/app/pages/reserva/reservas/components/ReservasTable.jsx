import useReserva from "./useReserva";
import { useEffect, useState } from "react";
import "../styles/ReservasTable.css";
import { getReservas } from "@/utils/peticiones";

export default function ReservasTable({ reservas }) {
  const { setReservas, handleEstadoReserva, handleCancelarReserva } = useReserva();
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  useEffect(() => {
    getReservas(setReservas);
  }, [setReservas]);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Habitación</th>
            <th>Piso</th>
            <th>Huésped</th>
            <th>Fecha Llegada</th>
            <th>Fecha Salida</th>
            <th>Pago</th>
            <th>Identificación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.codigo} id={reserva.codigo}>
              <td>{reserva.codigo}</td>
              <td>{reserva.numero_habitacion}</td>
              <td>{reserva.piso}</td>
              <td>{reserva.nombre}</td>
              <td>{reserva.fechallegada ? reserva.fechallegada.split("T")[0] : ""}</td>
              <td>{reserva.fechasalida ? reserva.fechasalida.split("T")[0] : ""}</td>
              <td>{reserva.pago}</td>
              <td>{reserva.identificacion}</td>
              <td>{reserva.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de detalles */}
      {reservaSeleccionada && (
        <div className="modal">
          <div className="modal-content">
            <h2>Detalles de la Reserva</h2>
            <p><b>Nombre:</b> {reservaSeleccionada.nombre} {reservaSeleccionada.apellido}</p>
            <p><b>Teléfono:</b> {reservaSeleccionada.telefono}</p>
            <p><b>Correo:</b> {reservaSeleccionada.correo}</p>
            <p><b>Tipo Documento:</b> {reservaSeleccionada.tipoDocumento}</p>
            <p><b>Número Documento:</b> {reservaSeleccionada.numeroDocumento}</p>
            <p><b>Método de Pago:</b> {reservaSeleccionada.metodoPago}</p>
            <p><b>Pago:</b> {reservaSeleccionada.pago}</p>
            <p><b>Total:</b> {reservaSeleccionada.total}</p>
            <button onClick={() => setReservaSeleccionada(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};
