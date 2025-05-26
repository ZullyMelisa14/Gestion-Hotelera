"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/utils/cookies"; // tu función para leer cookies

export default function ProtectedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const user = getCookie("auth_cookie");

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.rol)) {
      // Redirige a login o a una página de acceso denegado
      router.replace("/acceso-denegado");
    }
  }, [user, allowedRoles, router]);

  // Si el usuario no tiene rol permitido, no renderiza nada
  if (!user || !allowedRoles.includes(user.rol)) return null;

  return children;
}