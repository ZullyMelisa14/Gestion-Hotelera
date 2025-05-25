import useContextEmpleado from "./ContextEmpleados";
import "../styles/EmpleadosTable.css";
import EmpleadoModal from "./Modal";
import { useEffect } from "react";

export default function EmpleadosTable() {
  const {
    empleados,
    setEmpleadoSeleccionado,
    empleadoSeleccionado,
    isOpen,
    setIsOpen,
    edicion,
    setEdicion,
    crearEmpleado,
    actualizarEmpleado,
    borrarEmpleado,
    cargarEmpleados,
  } = useContextEmpleado();

  useEffect(() => {
    cargarEmpleados();
    // eslint-disable-next-line
  }, []);

  const handleAgregarEmpleado = async (empleado) => {
    if (edicion && empleado && empleado.id) {
      await actualizarEmpleado(empleado.id, empleado);
    } else {
      await crearEmpleado(empleado);
    }
    setIsOpen(false);
    setEdicion(false);
    setEmpleadoSeleccionado(null);
  };

  const handleOpenModal = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setEdicion(true);
    setIsOpen(true);
  };

  const handleEliminarEmpleado = async (id) => {
    await borrarEmpleado(id);
  };

  return (
    <div className="container">
      <button
        className="button-empleados"
        onClick={() => {
          setEmpleadoSeleccionado(null);
          setIsOpen(true);
          setEdicion(false);
        }}
        title="Agregar empleado"
      >
        +
      </button>
      <table>
        <thead>
          <tr>
            <th>IDENTIFICACIÓN</th>
            <th>NOMBRE</th>
            <th>ROL</th>
            <th>TELÉFONO</th>
            <th>USUARIO</th>
            <th>CONTRASEÑA</th>
            <th>ESTADO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado, index) => (
            <tr onClick={() => handleOpenModal(empleado)} key={empleado.id || index}>
              <td>{empleado.identificacion}</td>
              <td>{`${empleado.nombre} ${empleado.apellido}`}</td>
              <td>{empleado.rol}</td>
              <td>{empleado.telefono}</td>
              <td>{empleado.usuario}</td>
              <td>{empleado.contraseña ? "•".repeat(empleado.contraseña.length) : ""}</td>
              <td>{empleado.estado ? "activo" : "inactivo"}</td>
              <td>
                <div
                  onClick={e => {
                    e.stopPropagation();
                    handleEliminarEmpleado(empleado.id);
                  }}
                  className="trash-icon"
                  title="Eliminar"
                ></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EmpleadoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onAgregarEmpleado={handleAgregarEmpleado}
        empleado={edicion ? empleadoSeleccionado : null}
      />
    </div>
  );
}
