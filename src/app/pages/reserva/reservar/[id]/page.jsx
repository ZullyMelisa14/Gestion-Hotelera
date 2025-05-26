"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import Reserva from "../components/reservar";

export default function Page() {
  const params = useParams();
  const [habitacion, setHabitacion] = useState(null);

  useEffect(() => {
    const fetchHabitacion = async () => {
      const docRef = doc(db, "habitaciones", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHabitacion({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchHabitacion();
  }, [params.id]);

  if (!habitacion) return <p>Cargando...</p>;

  return <Reserva habitacion={habitacion} />;
}