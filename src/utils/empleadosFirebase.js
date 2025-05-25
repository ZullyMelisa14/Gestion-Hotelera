import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const EMPLEADOS_COLLECTION = "empleados";

export async function obtenerEmpleados() {
  const snapshot = await getDocs(collection(db, EMPLEADOS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function agregarEmpleado(empleado) {
  const docRef = await addDoc(collection(db, EMPLEADOS_COLLECTION), empleado);
  return { id: docRef.id, ...empleado };
}

export async function editarEmpleado(id, empleado) {
  const docRef = doc(db, EMPLEADOS_COLLECTION, id);
  await updateDoc(docRef, empleado);
}

export async function eliminarEmpleado(id) {
  const docRef = doc(db, EMPLEADOS_COLLECTION, id);
  await deleteDoc(docRef);
}