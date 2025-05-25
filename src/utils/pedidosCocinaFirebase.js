import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

const PEDIDOS_COLLECTION = "pedidos_cocina";

export async function agregarPedido(pedido) {
  await addDoc(collection(db, PEDIDOS_COLLECTION), pedido);
}

export async function obtenerPedidos() {
  const q = query(
    collection(db, PEDIDOS_COLLECTION),
    orderBy("fecha", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function actualizarEstadoPedido(id, nuevoEstado) {
  const docRef = doc(db, PEDIDOS_COLLECTION, id);
  await updateDoc(docRef, { estado: nuevoEstado });
}