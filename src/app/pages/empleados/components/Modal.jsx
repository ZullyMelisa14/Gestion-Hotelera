import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../styles/ModalEmpleado.css";

const rolMap = {
  "1": "Administrador",
  "2": "Cocinero",
  "3": "Limpieza",
  "4": "Recepcionista",
  "Administrador": "1",
  "Cocinero": "2",
  "Limpieza": "3",
  "Recepcionista": "4",
};

const initialEmpleado = {
  nombre: "",
  apellido: "",
  direccion: "",
  rol: "",
  telefono: "",
  tipo_identificacion: "",
  identificacion: "",
  usuario: "",
  contraseña: "",
  created_at: "",
  estado: true,
  action: "",
};

const EmpleadoModal = ({ isOpen, setIsOpen, onAgregarEmpleado, empleado }) => {
  const [nuevoEmpleado, setNuevoEmpleado] = useState(initialEmpleado);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#modal-root");
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (empleado) {
        setNuevoEmpleado({
          ...empleado,
          rol: rolMap[empleado.rol] || empleado.rol,
        });
      } else {
        setNuevoEmpleado(initialEmpleado);
      }
      setShowPassword(false);
    } else {
      setNuevoEmpleado(initialEmpleado);
      setShowPassword(false);
    }
  }, [isOpen, empleado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validaciones básicas
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;
    if (name === "identificacion" && !/^\d{0,20}$/.test(value)) return;
    setNuevoEmpleado({
      ...nuevoEmpleado,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const empleadoFinal = {
      ...nuevoEmpleado,
      rol: rolMap[nuevoEmpleado.rol] || nuevoEmpleado.rol,
      created_at: empleado ? empleado.created_at : new Date().toISOString(),
      action: empleado ? "Actualizar" : "Crear",
    };
    onAgregarEmpleado(empleadoFinal);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="nombre">Nombre</label>
          <input
            className="inputs"
            type="text"
            id="nombre"
            name="nombre"
            value={nuevoEmpleado.nombre}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
            pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$"
            title="Solo letras"
          />
        </div>
        <div className="input-container">
          <label htmlFor="apellido">Apellido</label>
          <input
            className="inputs"
            type="text"
            id="apellido"
            name="apellido"
            value={nuevoEmpleado.apellido}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
            pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$"
            title="Solo letras"
          />
        </div>
        <div className="input-container">
          <label htmlFor="rol">Rol de usuario</label>
          <select
            id="rol"
            name="rol"
            value={nuevoEmpleado.rol}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="1">Administrador</option>
            <option value="4">Recepcionista</option>
            <option value="3">Limpieza</option>
            <option value="2">Cocinero</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="direccion">Dirección</label>
          <input
            className="inputs"
            type="text"
            id="direccion"
            name="direccion"
            value={nuevoEmpleado.direccion}
            onChange={handleChange}
            maxLength={60}
          />
        </div>
        <div className="input-container">
          <label htmlFor="telefono">Teléfono</label>
          <input
            className="inputs"
            type="text"
            id="telefono"
            name="telefono"
            value={nuevoEmpleado.telefono}
            onChange={handleChange}
            required
            minLength={7}
            maxLength={15}
            pattern="^\d+$"
            title="Solo números"
          />
        </div>
        <div className="input-container">
          <label htmlFor="tipo_identificacion">Tipo de Identificación</label>
          <select
            id="tipo_identificacion"
            name="tipo_identificacion"
            value={nuevoEmpleado.tipo_identificacion}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PASS">Pasaporte</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="identificacion">Identificación</label>
          <input
            className="inputs"
            type="text"
            id="identificacion"
            name="identificacion"
            value={nuevoEmpleado.identificacion}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={20}
            pattern="^\d+$"
            title="Solo números"
          />
        </div>
        <div className="input-container">
          <label htmlFor="usuario">Usuario</label>
          <input
            className="inputs"
            type="text"
            id="usuario"
            name="usuario"
            value={nuevoEmpleado.usuario}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={20}
          />
        </div>
        <div className="input-container" style={{ position: "relative" }}>
          <label htmlFor="contraseña">Contraseña</label>
          <input
            className="inputs"
            type={showPassword ? "text" : "password"}
            id="contraseña"
            name="contraseña"
            value={nuevoEmpleado.contraseña}
            onChange={handleChange}
            required
            minLength={6}
            maxLength={20}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: 12,
              top: 38,
              cursor: "pointer",
              fontSize: "18px",
              color: "#475569",
              userSelect: "none",
            }}
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="buttons-container">
          <button type="button" onClick={handleClose}>
            Cancelar
          </button>
          <button type="submit">
            {empleado ? "Actualizar Trabajador" : "Agregar Trabajador"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EmpleadoModal;
