import { useEffect, useState } from "react";
import { getReservas } from "@/utils/peticiones";

export default function useReserva() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    getReservas().then(setReservas);
  }, []);

  const actualizarReserva = (reservaActualizada) => {
    setReservas(
      reservas.map((r) =>
        r.codigo === reservaActualizada.codigo ? reservaActualizada : r
      )
    );
  };

  const handleEstadoReserva = (reserva) => {
    const nuevaReserva = {
      ...reserva,
      estado: reserva.estado === "En espera" ? "En hospedaje" : "En espera",
    };
    actualizarReserva(nuevaReserva);
  };

  const handleCancelarReserva = (codigo, identificacion, pago, cancelado) => {
    const element = document.getElementById(codigo);
    const icon = document.getElementById(identificacion);
    const check = document.getElementById(pago);
    const canceladoInfo = document.getElementById(cancelado);

    if (element && icon && check && canceladoInfo) {
      if (element.style.backgroundColor !== "grey") {
        element.style.backgroundColor = "grey";
        icon.className = "none";
        check.style.display = "none";
        canceladoInfo.style.display = "block";
      }
    }
  };

  return {
    reservas,
    setReservas,
    handleEstadoReserva,
    handleCancelarReserva,
  };
}
