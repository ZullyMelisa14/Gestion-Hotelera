import Modal from "react-modal";
import useContextCocina from "./ContextCocina";
import "../styles/CocinaPage.css"; 

export default function ModalPedido({ isOpen, onClose }) {
  const { pedidoSeleccionado } = useContextCocina();

  if (!pedidoSeleccionado) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      ariaHideApp={false}
    >
      <button className="close-modal" onClick={onClose}>×</button>
      <h2>Detalle del Pedido</h2>
      <p><strong>Habitación:</strong> {pedidoSeleccionado.habitacion}</p>
      <p><strong>Notas:</strong> {pedidoSeleccionado.notas}</p>
      <p><strong>Estado:</strong> {pedidoSeleccionado.estado}</p>
      <p><strong>Fecha:</strong> {pedidoSeleccionado.fecha?.toDate?.().toLocaleString?.() || pedidoSeleccionado.fecha}</p>
      <div>
        <strong>Platos:</strong>
        <ul>
          {pedidoSeleccionado.platos.map((plato, i) => (
            <li key={i}>{plato.nombre} x{plato.cantidad}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}