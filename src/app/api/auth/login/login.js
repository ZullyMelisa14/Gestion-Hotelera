"use client";

import { useState } from "react";
import useLoginState from "@/utils/useLoginState";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data, handleData, handleSubmit } = useLoginState();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const customHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await handleSubmit(e);
    setIsSubmitting(false);

    if (result?.success) {
      toast.success("¡Bienvenido! Redirigiendo...");
    } else if (result?.error) {
      toast.error(result.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <form onSubmit={customHandleSubmit}>
          <h2 id="loginsesion">Iniciar Sesión</h2>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleData}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={handleData}
              placeholder="Contraseña"
              required
            />
            <span
              onClick={togglePassword}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {showPassword ? "🙉" : "🙈"}
            </span>
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
          </button>

          <div style={{ marginTop: 10, textAlign: "center" }}>
            <a href="/recuperar" style={{ fontSize: "14px", color: "#427ea3" }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
