"use client";
import { useState, useEffect } from "react";
import CardLimpieza from "./components/CardLimpieza";
import { getHabitaciones } from "@/utils/peticiones";

export default function Limpieza() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    getHabitaciones().then(setHabitaciones);
  }, []);

  return (
    <>
      {habitaciones
        .filter((h) => h.estado === "limpieza")
        .map((habitacion) => (
          <CardLimpieza key={habitacion.id} habitacion={habitacion} />
        ))}
    </>
  );
}
