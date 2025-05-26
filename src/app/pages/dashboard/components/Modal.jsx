import { useEffect } from "react";
import Modal from "react-modal";
import '../styles/Modal.css';
import { useRouter } from "next/navigation";

const HabitacionModal = ({ isOpen, onRequestClose, habitacion }) => {
  const router = useRouter();

  useEffect(() => {
    Modal.setAppElement("#modal-root");
  }, []);

  const handleGestionar = () => {
    router.push(`/pages/habitaciones/gestionar/${habitacion.id}`);
  };

  const handleReservar = () => {
    router.push(`/pages/reserva/reservar/${habitacion.id}`);
  };

  if (!habitacion) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel={`Habitación ${habitacion.numero}`}
    >
      <div className="modal-header">
        <button onClick={onRequestClose} aria-label="Cerrar">←</button>
        <h2>Habitación Nro: {habitacion.numero}</h2>
      </div>
      <div className="modal-body">
        <p><strong>Tipo:</strong> {habitacion.tipo}</p>
        <p><strong>Capacidad:</strong> {habitacion.capacidad}</p>
        <p><strong>Precio:</strong> ${habitacion.precio}</p>
        <p><strong>Estado:</strong> {habitacion.estado}</p>
        <p><strong>Descripción:</strong> {habitacion.descripcion || "Sin descripción"}</p>
        <p>
          <strong>Servicios:</strong>{" "}
          {Array.isArray(habitacion.servicios)
            ? habitacion.servicios.join(", ")
            : habitacion.servicios || "N/A"}
        </p>
      </div>
      <div className="modal-footer" style={{ display: "flex", gap: 12 }}>
        <button
          onClick={handleGestionar}
          className="modal-action-btn"
        >
          Gestionar
        </button>
        <button
          onClick={handleReservar}
          className="modal-action-btn"
          disabled={
            !habitacion.estado ||
            habitacion.estado.trim().toLowerCase() !== "disponible"
          }
          style={{
            backgroundColor:
              habitacion.estado &&
              habitacion.estado.trim().toLowerCase() === "disponible"
                ? "#0F4C75"
                : "#ccc",
            color: "#fff",
            cursor:
              habitacion.estado &&
              habitacion.estado.trim().toLowerCase() === "disponible"
                ? "pointer"
                : "not-allowed"
          }}
        >
          Reservar
        </button>
      </div>
    </Modal>
  );
};

export default HabitacionModal;