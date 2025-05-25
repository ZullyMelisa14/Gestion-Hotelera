import useReserva from "./useReserva";
import { useEffect } from "react";
import "../styles/ReservasTable.css";
import { getReservas } from "@/utils/peticiones";

export default function ReservasTable({ reservas }) {
  const { setReservas, handleEstadoReserva, handleCancelarReserva } = useReserva();

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
    </div>
  );
};
