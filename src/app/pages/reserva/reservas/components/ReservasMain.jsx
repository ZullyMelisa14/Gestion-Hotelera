"use client";
import { useState, useEffect } from "react";
import { getReservas } from "@/utils/peticiones";
import ReservasTable from "./ReservasTable";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservas().then(setReservas);
  }, []);

  return (
    <div>
      <h1>Reservas</h1>
      <ReservasTable reservas={reservas} />
    </div>
  );
}