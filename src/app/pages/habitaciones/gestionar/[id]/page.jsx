"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

const TIPOS = [
  "Habitación individual", "Habitación doble estándar (una cama doble)",
  "Habitación doble estándar (dos camas separadas)", "Habitación doble deluxe",
  "Estudio o apartamento", "Suite júnior", "Suite ejecutiva", "Suite presidencial"
];
const ESTADOS = ["disponible", "ocupada", "limpieza", "mantenimiento"];
const inputStyle = { padding: 8, borderRadius: 6, border: "1px solid #b0bec5" };
const btn = (bg) => ({
  background: bg, color: "#fff", border: "none", borderRadius: 8,
  padding: "8px 18px", fontWeight: "bold", cursor: "pointer"
});

export default function GestionarHabitacion() {
  const router = useRouter();
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState(null);
  const [estado, setEstado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [reservas, setReservas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    numero: "", tipo: "", precio: "", capacidad: "", piso: "",
    servicios: "", estrellas: "", descripcion: "", fotoUrl: ""
  });
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const fetchHabitacion = async () => {
      const snap = await getDoc(doc(db, "habitaciones", id));
      if (snap.exists()) {
        const data = snap.data();
        setHabitacion({ id: snap.id, ...data });
        setEstado(data.estado);
        setForm({
          numero: data.numero || "", tipo: data.tipo || "", precio: data.precio || "",
          capacidad: data.capacidad || "", piso: data.piso || "",
          servicios: Array.isArray(data.servicios) ? data.servicios.join(", ") : (data.servicios || ""),
          estrellas: data.estrellas || "", descripcion: data.descripcion || "", fotoUrl: data.fotoUrl || ""
        });
      }
    };
    fetchHabitacion();
  }, [id, editando]);

  useEffect(() => {
    const fetchReservas = async () => {
      const q = query(collection(db, "reservas"), where("habitacionId", "==", id));
      const qs = await getDocs(q);
      setReservas(qs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchReservas();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "habitaciones", id), {
        numero: form.numero, tipo: form.tipo, precio: Number(form.precio),
        capacidad: Number(form.capacidad), piso: Number(form.piso),
        servicios: form.servicios ? form.servicios.split(",").map(s => s.trim()).filter(Boolean) : [],
        estrellas: Number(form.estrellas), descripcion: form.descripcion, fotoUrl: form.fotoUrl
      });
      setMensaje("¡Habitación actualizada!"); setEditando(false);
    } catch { setMensaje("Error al actualizar la habitación"); }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "habitaciones", id));
      setMensaje("Habitación eliminada");
      setTimeout(() => router.push("/pages/dashboard"), 1200);
    } catch { setMensaje("Error al eliminar la habitación"); }
  };

  const handleGuardarEstado = async () => {
    const hoy = new Date().toISOString().split("T")[0];
    const reservaActiva = reservas.some(r => hoy >= r.fechaLlegada && hoy <= r.fechaSalida);
    if (estado === "disponible" && reservaActiva)
      return setMensaje("No se puede marcar como disponible: hay una reserva activa.");
    try {
      await updateDoc(doc(db, "habitaciones", id), { estado });
      setMensaje("¡Estado actualizado!");
      setHabitacion(prev => ({ ...prev, estado }));
    } catch { setMensaje("Error al actualizar el estado"); }
  };

  if (!habitacion) return <p style={{ textAlign: "center", marginTop: 40 }}>Cargando...</p>;

  return (
    <div style={{
      maxWidth: 600, margin: "40px auto", padding: 32, background: "#f7fafd",
      borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <h1 style={{ textAlign: "center", color: "#0F4C75", marginBottom: 24 }}>
        Gestionar Habitación <span style={{ color: "#3282B8" }}>{habitacion.numero}</span>
      </h1>

      {/* Mostrar datos o formulario de edición */}
      {!editando ? (
        <>
          <div style={{ marginBottom: 24 }}>
            { [
              ["Tipo", habitacion.tipo], ["Capacidad", habitacion.capacidad], ["Precio", `$${habitacion.precio}`],
              ["Piso", habitacion.piso], ["Estrellas", habitacion.estrellas],
              ["Descripción", habitacion.descripcion || "Sin descripción"],
              ["Servicios", habitacion.servicios && habitacion.servicios.length > 0 ? habitacion.servicios.join(", ") : "N/A"]
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 8 }}>
                <strong>{label}:</strong> <span>{value}</span>
              </div>
            )) }
            { habitacion.fotoUrl && (
              <img src={habitacion.fotoUrl} alt="Foto habitación"
                style={{ width: "100%", marginTop: 16, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
            ) }
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <button onClick={() => setEditando(true)} style={btn("#0F4C75")}>Editar</button>
            <button onClick={() => setEliminando(true)} style={btn("#d32f2f")}>Eliminar</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdate} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" name="numero" value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} placeholder="Número" required style={inputStyle} />
            <select name="tipo" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required style={inputStyle}>
              <option value="">Seleccione tipo...</option>
              {TIPOS.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
            </select>
            <input type="number" name="precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} placeholder="Precio" required style={inputStyle} />
            <input type="number" name="capacidad" value={form.capacidad} onChange={e => setForm({ ...form, capacidad: e.target.value })} placeholder="Capacidad" required style={inputStyle} />
            <input name="piso" type="number" placeholder="Piso" value={form.piso} onChange={e => setForm({ ...form, piso: e.target.value })} required style={inputStyle} />
            <input type="text" name="servicios" value={form.servicios} onChange={e => setForm({ ...form, servicios: e.target.value })} placeholder="Servicios (separados por coma: WiFi, TV, Aire)" style={inputStyle} />
            <input type="number" name="estrellas" value={form.estrellas} onChange={e => setForm({ ...form, estrellas: e.target.value })} placeholder="Estrellas (1-5)" min={1} max={5} required style={inputStyle} />
            <input type="text" name="descripcion" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" style={inputStyle} />
            <input type="text" name="fotoUrl" value={form.fotoUrl} onChange={e => setForm({ ...form, fotoUrl: e.target.value })} placeholder="URL de la foto" style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="submit" style={btn("#0F4C75")}>Guardar cambios</button>
            <button type="button" onClick={() => setEditando(false)} style={btn("#757575")}>Cancelar</button>
          </div>
        </form>
      )}

      {/* Estado */}
      <div style={{
        margin: "24px 0", display: "flex", alignItems: "center", gap: 16,
        background: "#eaf6fb", padding: 16, borderRadius: 8
      }}>
        <label style={{ fontWeight: "bold" }}>Estado:</label>
        <span style={{
          width: 14, height: 14, borderRadius: "50%", display: "inline-block",
          background:
            estado === "disponible" ? "#43a047" :
              estado === "ocupada" ? "#f9a825" :
                estado === "limpieza" ? "#1976d2" : "#757575",
          marginRight: 8
        }}></span>
        <select value={estado} onChange={e => setEstado(e.target.value)} style={{ ...inputStyle, fontSize: 15 }}>
          {ESTADOS.map(e => (
            <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
          ))}
        </select>
        <button onClick={handleGuardarEstado} style={{ ...btn("#0F4C75"), marginLeft: 10, borderRadius: 6, padding: "7px 18px" }}>
          Guardar
        </button>
      </div>

      {/* Modal de confirmación para eliminar */}
      {eliminando && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000
        }}>
          <div style={{
            background: "#fff", padding: 32, borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)", maxWidth: 320, textAlign: "center"
          }}>
            <p style={{ marginBottom: 24, fontWeight: "bold" }}>
              ¿Seguro que deseas eliminar esta habitación?
            </p>
            <button onClick={handleDelete} style={{ ...btn("#d32f2f"), marginRight: 10 }}>Sí, eliminar</button>
            <button onClick={() => setEliminando(false)} style={btn("#757575")}>Cancelar</button>
          </div>
        </div>
      )}

      {mensaje && (
        <p style={{
          color: mensaje.startsWith("¡") ? "#43a047" : "#d32f2f",
          background: "#fff", padding: "8px 12px", borderRadius: 6,
          margin: "16px 0", textAlign: "center"
        }}>
          {mensaje}
        </p>
      )}

      <hr style={{ margin: "32px 0" }} />
      <h2 style={{ color: "#0F4C75", marginBottom: 16 }}>Historial de Reservas</h2>
      {reservas.length === 0 && (
        <p style={{ color: "#757575" }}>No hay reservas para esta habitación.</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {reservas.map(reserva => (
          <div key={reserva.id} style={{
            border: "1px solid #e0e0e0", borderRadius: 8, padding: 14,
            background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
          }}>
            <p style={{ margin: 0 }}><strong>Huésped:</strong> {reserva.nombre} {reserva.apellido}</p>
            <p style={{ margin: 0 }}><strong>Fechas:</strong> {reserva.fechaLlegada} - {reserva.fechaSalida}</p>
            <p style={{ margin: 0 }}><strong>Método de pago:</strong> {reserva.metodoPago}</p>
          </div>
        ))}
      </div>

      <button onClick={() => router.push("/pages/dashboard")}
        style={{
          marginTop: 32, width: "100%", padding: "12px 0", background: "#3282B8",
          color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold",
          fontSize: 16, cursor: "pointer", transition: "background 0.2s"
        }}>
        Volver al dashboard
      </button>
    </div>
  );
}
