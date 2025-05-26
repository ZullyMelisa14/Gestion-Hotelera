import useContextCocina from "./ContextCocina";
import { useState } from "react";
import "../styles/CocinaPage.css"; 


export default function PedidosTable() {
  const { pedidos, cambiarEstado, setPedidoSeleccionado } = useContextCocina();
  const [filtro, setFiltro] = useState("pendiente");

  return (
    <div className="cocina-bg" style={{ padding: "24px" }}>
  <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#1e3a8a" }}>Pedidos de Cocina</h2>

  <div style={{ marginBottom: 16 }}>
    <label style={{ marginRight: "8px", fontWeight: 500 }}>Filtrar por estado: </label>
    <select
      value={filtro}
      onChange={e => setFiltro(e.target.value)}
      style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
    >
      <option value="pendiente">Pendiente</option>
      <option value="en preparación">En preparación</option>
      <option value="listo">Listo</option>
      <option value="entregado">Entregado</option>
      <option value="">Todos</option>
    </select>
  </div>

  <table className="table">
    <thead>
      <tr>
        <th>Habitación</th>
        <th>Platos</th>
        <th>Notas</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {pedidos
        .filter(p => !filtro || p.estado === filtro)
        .map(pedido => (
          <tr key={pedido.id} onClick={() => setPedidoSeleccionado(pedido)}>
            <td>{pedido.habitacion}</td>
            <td>
              {pedido.platos.map((plato, i) => (
                <div key={i}>{plato.nombre} x{plato.cantidad}</div>
              ))}
            </td>
            <td>{pedido.notas}</td>
            <td>{pedido.estado}</td>
            <td>
              {pedido.estado !== "entregado" && (
                <select
                  value={pedido.estado}
                  onChange={e => cambiarEstado(pedido.id, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en preparación">En preparación</option>
                  <option value="listo">Listo</option>
                  <option value="entregado">Entregado</option>
                </select>
              )}
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

  );
}