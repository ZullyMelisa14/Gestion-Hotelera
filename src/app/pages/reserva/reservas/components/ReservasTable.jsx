import useReserva from "./useReserva";
import { useEffect, useState } from "react";
import "../styles/ReservasTable.css";
import { getReservas } from "@/utils/peticiones";

export default function ReservasTable() {
  const { reservas, setReservas, handleEstadoReserva, handleCancelarReserva } = useReserva();
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
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Número Documento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr
              key={reserva.codigo}
              style={{ cursor: "pointer", background: reserva.estado === "Cancelada" ? "#ffeaea" : "inherit" }}
              onClick={(e) => {
                if (e.target.tagName !== "BUTTON") setReservaSeleccionada(reserva);
              }}
            >
              <td>{reserva.codigo}</td>
              <td>{reserva.nombre}</td>
              <td>{reserva.apellido}</td>
              <td>{reserva.numeroDocumento}</td>
              <td>
                <span
                  style={{
                    color:
                      reserva.estado === "Cancelada"
                        ? "#d32f2f"
                        : reserva.estado === "En hospedaje"
                        ? "#43a047"
                        : "#0F4C75",
                    fontWeight: "bold",
                  }}
                >
                  {reserva.estado}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleEstadoReserva(reserva.codigo)}
                  style={{
                    marginRight: 6,
                    background: "#3282B8",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Cambiar estado
                </button>
                <button
                  onClick={() => handleCancelarReserva(reserva.codigo)}
                  style={{
                    background: "#d32f2f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
              </td>
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
            <p><b>Habitación:</b> {reservaSeleccionada.numero_habitacion}</p>
            <p><b>Piso:</b> {reservaSeleccionada.piso}</p>
            <p><b>Fecha Llegada:</b> {reservaSeleccionada.fechallegada ? reservaSeleccionada.fechallegada.split("T")[0] : ""}</p>
            <p><b>Fecha Salida:</b> {reservaSeleccionada.fechasalida ? reservaSeleccionada.fechasalida.split("T")[0] : ""}</p>
            <button onClick={() => setReservaSeleccionada(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
