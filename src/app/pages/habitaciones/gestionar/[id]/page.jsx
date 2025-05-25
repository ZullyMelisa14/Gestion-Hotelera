"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

export default function GestionarHabitacion() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [habitacion, setHabitacion] = useState(null);
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [reservas, setReservas] = useState([]);

  // Cargar datos de la habitación
  useEffect(() => {
    const fetchHabitacion = async () => {
      const docRef = doc(db, "habitaciones", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHabitacion({ id: docSnap.id, ...docSnap.data() });
        setEstado(docSnap.data().estado);
      }
    };
    fetchHabitacion();
  }, [id]);

  // Cargar historial de reservas
  useEffect(() => {
    const fetchReservas = async () => {
      const reservasRef = collection(db, "reservas");
      const q = query(reservasRef, where("habitacionId", "==", id));
      const querySnapshot = await getDocs(q);
      setReservas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchReservas();
  }, [id]);

  const handleEstadoChange = (e) => setEstado(e.target.value);

  const handleGuardar = async () => {
    const hoy = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
    const reservaActiva = reservas.some(r =>
      hoy >= r.fechaLlegada && hoy <= r.fechaSalida
    );

    if (estado === "disponible" && reservaActiva) {
      setMensaje("No se puede marcar como disponible: hay una reserva activa.");
      return;
    }

    try {
      await updateDoc(doc(db, "habitaciones", id), { estado });
      setMensaje("¡Estado actualizado!");
    } catch (error) {
      setMensaje("Error al actualizar el estado");
    }
  };

  if (!habitacion) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", padding: 20, background: "#fff", borderRadius: 8 }}>
      <h1>Gestionar Habitación {habitacion.numero}</h1>
      <p><strong>Tipo:</strong> {habitacion.tipo}</p>
      <p><strong>Capacidad:</strong> {habitacion.capacidad}</p>
      <p><strong>Precio:</strong> ${habitacion.precio}</p>
      <p><strong>Descripción:</strong> {habitacion.descripcion}</p>
      <p><strong>Servicios:</strong> {habitacion.servicios && habitacion.servicios.join(", ")}</p>
      {habitacion.fotoUrl && (
        <img src={habitacion.fotoUrl} alt="Foto habitación" style={{ width: "100%", marginTop: 10 }} />
      )}

      <div style={{ margin: "20px 0", display: "flex", alignItems: "center", gap: 10 }}>
        <label><strong>Estado:</strong></label>
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            display: "inline-block",
            background:
              estado === "disponible" ? "green" :
              estado === "ocupada" ? "orange" :
              estado === "limpieza" ? "blue" :
              "gray"
          }}
        ></span>
        <select value={estado} onChange={handleEstadoChange}>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="limpieza">Limpieza</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
        <button onClick={handleGuardar}>Guardar</button>
      </div>

      {reservas.some(r =>
        new Date().toISOString().split("T")[0] >= r.fechaLlegada &&
        new Date().toISOString().split("T")[0] <= r.fechaSalida
      ) && (
        <p style={{ color: "orange", marginTop: 10 }}>
          ⚠ Hay una reserva activa para esta habitación hoy.
        </p>
      )}

      {mensaje && <p style={{ color: mensaje.startsWith("¡") ? "green" : "red" }}>{mensaje}</p>}

      <hr />
      <h2>Historial de Reservas</h2>
      {reservas.length === 0 && <p>No hay reservas para esta habitación.</p>}
      {reservas.map(reserva => (
        <div key={reserva.id} style={{ border: "1px solid #eee", padding: 10, marginBottom: 10 }}>
          <p><strong>Huésped:</strong> {reserva.nombre} {reserva.apellido}</p>
          <p><strong>Fechas:</strong> {reserva.fechaLlegada} - {reserva.fechaSalida}</p>
          <p><strong>Método de pago:</strong> {reserva.metodoPago}</p>
        </div>
      ))}

      <button onClick={() => router.push("/pages/dashboard")} style={{ marginTop: 20 }}>
        Volver al dashboard
      </button>
    </div>
  );
}
