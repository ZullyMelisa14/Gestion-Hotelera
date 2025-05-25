"use client";
import { useState, useEffect } from "react";
import { getReservas } from "@/utils/peticiones";
import ReservasTable from "./ReservasTable";
import AgregarReserva from "./AgregarReserva";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);

  useEffect(() => {
    getReservas().then(setReservas);
  }, []);

  return (
    <div>
      <h1>Reservas</h1>
      <button onClick={() => setModalAgregar(true)}>Agregar Reserva</button>
      <ReservasTable reservas={reservas} />
      {modalAgregar && (
        <AgregarReserva
          onReservaAgregada={() => {
            getReservas().then(setReservas);
            setModalAgregar(false);
          }}
          onClose={() => setModalAgregar(false)}
        />
      )}
    </div>
  );
}