"use client";
import { collection, getDocs, query, where, onSnapshot, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function loginHandler({ email, password }) {
  try {
    const empleadosRef = collection(db, "empleados");
    const q = query(
      empleadosRef,
      where("usuario", "==", email),
      where("contraseña", "==", password)
    );
    const querySnapshot = await getDocs(q);

    console.log("Intentando login con:", email, password);
    console.log("Empleados encontrados:", querySnapshot.docs.map(doc => doc.data()));

    if (querySnapshot.empty) {
      return { error: "Correo o contraseña incorrectos" };
    }

    const empleado = querySnapshot.docs[0].data();
    const { nombre, rol } = empleado;

    document.cookie = `auth_cookie=${encodeURIComponent(JSON.stringify({ nombre, rol }))}; path=/`;

    return { success: true };
  } catch (error) {
    return { error: "Error al iniciar sesión" };
  }
}

// LOGOUT SOLO BORRA LA COOKIE Y REDIRIGE
export async function logoutHandler(router) {
  try {
    // Borra la cookie
    document.cookie = "auth_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/");
    return { status: "ok" };
  } catch (error) {
    console.error(error);
    throw new Error("Error al cerrar la sesión");
  }
}

// OBTENER EMPLEADOS DESDE FIRESTORE
export async function getEmpleados(setEmpleados) {
  try {
    const empleadosCol = collection(db, "empleados");
    const empleadosSnapshot = await getDocs(empleadosCol);
    const empleadosList = empleadosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEmpleados(empleadosList);
  } catch (error) {
    console.error(error);
    setEmpleados([]);
  }
}

// OBTENER RESERVAS DESDE FIRESTORE
export async function getReservas() {
  const snapshot = await getDocs(collection(db, "reservas"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtener habitaciones desde Firestore
export async function getHabitaciones() {
  try {
    const habitacionesCol = collection(db, "habitaciones");
    const habitacionesSnapshot = await getDocs(habitacionesCol);
    return habitacionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Agregar habitación a Firestore
export async function agregarHabitacion(habitacionData) {
  try {
    const docRef = await addDoc(collection(db, "habitaciones"), habitacionData);
    return { id: docRef.id, ...habitacionData };
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar habitación");
  }
}

// Agregar reserva a Firestore
export async function agregarReserva(reserva) {
  await addDoc(collection(db, "reservas"), reserva);
}

// Suscribir a cambios en habitaciones
export function suscribirHabitaciones(callback) {
  return onSnapshot(collection(db, "habitaciones"), (snapshot) => {
    const habitaciones = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(habitaciones);
  });
}

// Petición GET genérica
export async function peticionGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en la petición");
  return await res.json();
}

// Actualizar estado de limpieza de habitación
export async function actualizarEstadoLimpiezaHabitacion(id, nuevoEstado) {
  const docRef = doc(db, "habitaciones", id);
  await updateDoc(docRef, { estado_limpieza: nuevoEstado });
}

// Actualizar estado de habitación
export async function actualizarEstadoHabitacion(idHabitacion, nuevoEstado) {
  const docRef = doc(db, "habitaciones", idHabitacion);
  await updateDoc(docRef, { estado: nuevoEstado });
}


