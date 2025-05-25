import { useEffect } from "react";
import Modal from "react-modal";
import '../styles/Modal.css';
import { useRouter } from "next/navigation";

const HabitacionModal = ({ isOpen, onRequestClose, habitacion }) => {
  const router = useRouter();
  useEffect(() => {
    Modal.setAppElement("#modal-root");
  }, []);
  
  const handleAction = () => {
    if (habitacion.estado && habitacion.estado.includes("disponible")) {
      router.push("/pages/reserva/reservar");
    } else {
      // Redirige a la página de gestión de la habitación usando su id
      router.push(`/pages/habitaciones/gestionar/${habitacion.id}`);
    }
  };

  if (!habitacion) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="modal-overlay"
        className="modal-content"
        contentLabel={`Habitación ${habitacion.numero}`}
      >
        <div className="modal-header">
          <button onClick={onRequestClose}>←</button>
          <h2>Habitación Nro: {habitacion.numero}</h2>
        </div>
        <div className="modal-body">
          <p><strong>Tipo:</strong> {habitacion.tipo}</p>
          <p><strong>Capacidad:</strong> {habitacion.capacidad}</p>
          <p><strong>Precio:</strong> ${habitacion.precio}</p>
          <p><strong>Estado:</strong> {habitacion.estado}</p>
          <p><strong>Descripción:</strong> {habitacion.descripcion}</p>
          <p><strong>Servicios:</strong> {habitacion.servicios && habitacion.servicios.join(", ")}</p>
          {habitacion.fotoUrl && (
            <img src={habitacion.fotoUrl} alt="Foto habitación" style={{ width: "100%", marginTop: 10 }} />
          )}
        </div>
        <div className="modal-footer">
          <button onClick={handleAction}>{'>'}</button>
        </div>
      </Modal>
    </>
  );
};

export default HabitacionModal;