import { useState } from "react";
import { agregarPedido } from "@/utils/pedidosCocinaFirebase";

export default function AgregarPedido({ onPedidoAgregado }) {
  const [habitacion, setHabitacion] = useState("");
  const [platos, setPlatos] = useState([{ nombre: "", cantidad: 1 }]);
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlatoChange = (index, field, value) => {
    const nuevosPlatos = [...platos];
    nuevosPlatos[index][field] = value;
    setPlatos(nuevosPlatos);
  };

  const agregarPlato = () => setPlatos([...platos, { nombre: "", cantidad: 1 }]);
  const quitarPlato = (index) => setPlatos(platos.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await agregarPedido({
      habitacion,
      platos: platos.filter(p => p.nombre),
      notas,
      estado: "pendiente",
      fecha: new Date()
    });
    setLoading(false);
    setHabitacion("");
    setPlatos([{ nombre: "", cantidad: 1 }]);
    setNotas("");
    if (onPedidoAgregado) onPedidoAgregado();
    alert("¡Pedido agregado!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h3>Nuevo Pedido</h3>
      <div>
        <label>Habitación:</label>
        <input value={habitacion} onChange={e => setHabitacion(e.target.value)} required />
      </div>
      <div>
        <label>Platos:</label>
        {platos.map((plato, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <input
              placeholder="Nombre del plato"
              value={plato.nombre}
              onChange={e => handlePlatoChange(i, "nombre", e.target.value)}
              required
            />
            <input
              type="number"
              min={1}
              value={plato.cantidad}
              onChange={e => handlePlatoChange(i, "cantidad", Number(e.target.value))}
              required
              style={{ width: 60 }}
            />
            {platos.length > 1 && (
              <button type="button" onClick={() => quitarPlato(i)}>Quitar</button>
            )}
          </div>
        ))}
        <button type="button" onClick={agregarPlato}>Agregar otro plato</button>
      </div>
      <div>
        <label>Notas:</label>
        <input value={notas} onChange={e => setNotas(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Agregando..." : "Agregar Pedido"}
      </button>
    </form>
  );
}