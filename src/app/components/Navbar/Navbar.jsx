"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import getCookie from "@/utils/cookies";
import style from "./Navbar.module.css";
import Menu from "./ui/Menu/Menu";

export default function Navbar() {
  const [user, setUser] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    setUser(getCookie("auth_cookie"));
    console.log("Navbar lee cookie:", getCookie("auth_cookie"));
  }, [pathname]); // Se actualiza cada vez que cambia la ruta

  return (
    <div className={style.divNavBar}>
      <img className={style.logo} src="/Logo/Logo.png" alt="Logo Hotel" />
      <div className={style.divPerfilContainer}>
        <div className={style.divPerfil}>
          <p className={style.nombre}>
            {user.nombre ? `👤 ${user.nombre}` : "No autenticado"}
          </p>
          <p className={style.rol}>
            {user.rol ? `🔑 ${user.rol}` : ""}
          </p>
        </div>
        <Menu />
      </div>
    </div>
  );
}
