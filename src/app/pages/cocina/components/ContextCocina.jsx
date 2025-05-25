import { createContext, useContext, useState, useEffect } from "react";
import { obtenerPedidos, actualizarEstadoPedido } from "@/utils/pedidosCocinaFirebase";

const ContextCocina = createContext();

export const ContextCocinaProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const cargarPedidos = async () => {
    const lista = await obtenerPedidos();
    setPedidos(lista);
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    await actualizarEstadoPedido(id, nuevoEstado);
    await cargarPedidos();
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  return (
    <ContextCocina.Provider value={{
      pedidos,
      pedidoSeleccionado,
      setPedidoSeleccionado,
      cargarPedidos,
      cambiarEstado
    }}>
      {children}
    </ContextCocina.Provider>
  );
};

export default function useContextCocina() {
  return useContext(ContextCocina);
}