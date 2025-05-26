"use client";
import { useState } from "react";
import style from "./Menu.module.css";
import Link from "next/link";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { logoutHandler } from "@/utils/peticiones";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutHandler(router);
    closeMenu();
  };

  return (
    <div className={style.menuContainer}>
      <button onClick={toggleMenu} className={style.menuButton}>
        <FiMenu className={style.menuIcon} />
      </button>

      {isOpen && (
        <div className={style.dropdownMenu}>
          <ul>
            <li><Link className={style.Link} href="/pages/dashboard" onClick={closeMenu}>Habitaciones</Link></li>
            <li><Link className={style.Link} href="/pages/empleados" onClick={closeMenu}>Trabajadores</Link></li>
            <li><Link className={style.Link} href="/pages/cocina" onClick={closeMenu}>Cocina</Link></li>
            <li><Link className={style.Link} href="/pages/limpieza" onClick={closeMenu}>Limpieza</Link></li>
            <li><Link className={style.Link} href="/pages/reserva/reservas" onClick={closeMenu}>Reservas</Link></li>
          </ul>
          <hr className={style.separator} />
          <div className={style.centeredButton}>
            <button onClick={handleLogout} className={style.logoutButton}>
              <FiLogOut className={style.logoutIcon} />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
