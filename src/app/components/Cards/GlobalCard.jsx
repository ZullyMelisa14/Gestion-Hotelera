import "./styles/card.css";
import { FaBed, FaStar } from "react-icons/fa";

const CardContent = ({ habitacion, onClick, children }) => {
  return (
    <section className="card" onClick={onClick}>
      <div className="card-header">
        <div className="card-number">#{habitacion.numero}</div>
        <FaBed className="card-icon" />
      </div>

      <div className="card-room-type">
        <span>{habitacion.nombre}</span>
        <span className="star-list">
          {Array.from({ length: habitacion.estrellas || 0 }).map((_, i) => (
            <FaStar key={i} className="star-icon" />
          ))}
        </span>
      </div>

      <div className="card-services">
        <strong>Servicios:</strong>{" "}
        {Array.isArray(habitacion.servicios)
          ? habitacion.servicios.join(", ")
          : habitacion.servicios || "N/A"}
      </div>

      {children}
    </section>
  );
};

export default CardContent;
