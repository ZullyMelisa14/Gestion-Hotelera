import { useState, useEffect } from "react";
import { getHabitaciones } from "@/utils/peticiones";
import KitchenService from "./KitchenMain";

export default function KitchenServiceWrapper() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getHabitaciones().then(setRooms);
  }, []);

  return <KitchenService reserva_habitacion={rooms} />;
}