"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/utils/cookies";

// Función para obtener la ruta predeterminada según el rol
function rutaPorRol(rol) {
  if (rol === "Administrador" || rol === "Recepcionista") return "/pages/dashboard";
  if (rol === "Limpieza") return "/pages/limpieza";
  if (rol === "Cocinero") return "/pages/cocina";
  return "/acceso-denegado";
}

export default function ProtectedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getCookie("auth_cookie"));
  }, []);

  useEffect(() => {
    if (user === undefined) return; // Espera a que la cookie esté lista
    if (!user || !allowedRoles.includes(user.rol)) {
      // Redirige a la pantalla predeterminada de su rol
      router.replace(rutaPorRol(user?.rol));
    }
  }, [user, allowedRoles, router]);

  console.log("User en ProtectedRoute:", user, "Roles:", allowedRoles);

  if (user === undefined) return null; // Espera a que la cookie esté lista
  if (!user || !allowedRoles.includes(user.rol)) return null;
  return children;
}