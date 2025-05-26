"use client";
import { useEffect, useState } from "react";
import { suscribirHabitaciones } from "@/utils/peticiones";
import AgregarHabitacion from "@/app/components/AgregarHabitacion";
import Cards from "./components/cardMain";
import "./styles/Habitaciones.css";

export default function Recepcionista() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const unsuscribe = suscribirHabitaciones(setHabitaciones);
    return () => unsuscribe();
  }, []);

  // Ordenar habitaciones por número ascendente
  const habitacionesOrdenadas = [...habitaciones].sort((a, b) => a.numero - b.numero);

  return (
    <>
      <AgregarHabitacion />
      <Cards habitaciones={habitacionesOrdenadas} />
    </>
  );
}
