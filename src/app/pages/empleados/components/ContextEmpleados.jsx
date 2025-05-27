import { useState, createContext, useContext, useEffect } from 'react';
import {
  obtenerEmpleados,
  agregarEmpleado,
  editarEmpleado,
  eliminarEmpleado,
} from "@/utils/empleadosFirebase";

export const ContextEmpleados = createContext();

export const ContextEmpleadosProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const lista = await obtenerEmpleados();
    setEmpleados(lista);
  };

  const crearEmpleado = async (empleado) => {
    await agregarEmpleado(empleado);
    await cargarEmpleados();
  };

  const actualizarEmpleado = async (id, empleado) => {
    await editarEmpleado(id, empleado);
    await cargarEmpleados();
  };

  const borrarEmpleado = async (id) => {
    await eliminarEmpleado(id);
    await cargarEmpleados();
  };

  return (
    <ContextEmpleados.Provider
      value={{
        empleados,
        setEmpleados,
        empleadoSeleccionado,
        setEmpleadoSeleccionado,
        isOpen,
        setIsOpen,
        edicion,
        setEdicion,
        cargarEmpleados,
        crearEmpleado,
        actualizarEmpleado,
        borrarEmpleado,
      }}
    >
      {children}
    </ContextEmpleados.Provider>
  );
};

export default function useContextEmpleado() {
  return useContext(ContextEmpleados);
}
