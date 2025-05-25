import { getHabitaciones } from "@/utils/peticiones";
import Cards from "./components/cardMain";
import AgregarHabitacion from "@/app/components/AgregarHabitacion"; // <-- Agrega esta línea
import "./styles/Habitaciones.css";

export default async function Recepcionista() {
  // Traer la lista de habitaciones desde Firestore
  const habitaciones = await getHabitaciones();
  return (
    <>
      <Cards habitaciones={habitaciones} />
      <AgregarHabitacion />
    </>
  );
}
