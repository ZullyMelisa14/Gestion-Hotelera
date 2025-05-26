import { useEffect, useState } from "react";
import { getReservas } from "@/utils/peticiones";

export default function useReserva() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservas().then(setReservas);
  }, []);

  // Actualiza el estado de una reserva (En espera <-> En hospedaje)
  const handleEstadoReserva = (codigo) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.codigo === codigo
          ? {
              ...r,
              estado: r.estado === "En espera" ? "En hospedaje" : "En espera",
            }
          : r
      )
    );
  };

  // Marca una reserva como cancelada (cambia el estado a "Cancelada")
  const handleCancelarReserva = (codigo) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.codigo === codigo ? { ...r, estado: "Cancelada" } : r
      )
    );
  };

  return {
    reservas,
    setReservas,
    handleEstadoReserva,
    handleCancelarReserva,
  };
}
