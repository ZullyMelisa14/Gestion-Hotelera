"use client";
import { useState, useEffect } from "react";
import CardLimpieza from "./components/CardLimpieza";
import { getHabitaciones } from "@/utils/peticiones";
import styles from "./styles/Limpieza.css";

export default function Limpieza() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    getHabitaciones().then(setHabitaciones);
  }, []);

  const habitacionesLimpieza = habitaciones.filter((h) => h.estado === "limpieza");

  return (
    <div className={styles.limpiezaContainer}>
      <h1 className={styles.titulo}>Habitaciones en Limpieza</h1>
      <div className={styles.grid}>
        {habitacionesLimpieza.length === 0 ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}>
            No hay habitaciones en limpieza.
          </p>
        ) : (
          habitacionesLimpieza.map((habitacion) => (
            <CardLimpieza key={habitacion.id} habitacion={habitacion} />
          ))
        )}
      </div>
    </div>
  );
}
