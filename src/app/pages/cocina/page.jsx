"use client";
import { useState } from "react";
import { ContextCocinaProvider } from "./components/ContextCocina";
import PedidosTable from "./components/PedidosTable";
import ModalPedido from "./components/ModalPedido";
import AgregarPedido from "./components/AgregarPedido";
import "./styles/CocinaPage.css";


export default function CocinaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAgregar, setModalAgregar] = useState(false);

  return (
    <ContextCocinaProvider>
      <PedidosTable onShowDetalle={() => setModalOpen(true)} />
      <ModalPedido isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Modal para agregar pedido */}
      {modalAgregar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setModalAgregar(false)}>×</button>
            <AgregarPedido onPedidoAgregado={() => setModalAgregar(false)} />
          </div>
        </div>
      )}
      {/* Botón flotante */}
      <button
        className="fab"
        title="Agregar pedido"
        onClick={() => setModalAgregar(true)}
      >
        +
      </button>
    </ContextCocinaProvider>
  );
}
