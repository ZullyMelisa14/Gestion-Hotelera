import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// LOGIN
export async function loginHandler({ email, password }, router) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/pages/dashboard");
    return { status: "ok" };
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la sesión");
  }
}

// LOGOUT
export async function logoutHandler(router) {
  try {
    await signOut(auth);
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

// REGISTRO DE USUARIO
export async function registerHandler({ email, password }) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { status: "ok" };
  } catch (error) {
    console.error(error);
    throw new Error("Error al registrar usuario");
  }
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

// Debe estar así:
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


