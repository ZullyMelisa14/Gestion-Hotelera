"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookie from "@/utils/cookies";

export default function ProtectedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const user = getCookie("auth_cookie");

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.rol)) {
      router.replace("/acceso-denegado");
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.rol)) return null;
  return children;
}