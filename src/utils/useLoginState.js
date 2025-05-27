import { useState } from "react";
import { loginHandler } from "./peticiones";

export default function useLoginState() {
  const [data, setData] = useState({ email: "", password: "", error: null });

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email && data.password) {
      setData({ ...data, error: "Ingrese su correo electrónico" });
      return { error: "Ingrese su correo electrónico" };
    } else if (!data.password && data.email) {
      setData({ ...data, error: "Ingrese su contraseña" });
      return { error: "Ingrese su contraseña" };
    } else if (!data.email && !data.password) {
      setData({ ...data, error: "Ingrese su correo y contraseña" });
      return { error: "Ingrese su correo y contraseña" };
    } else {
      setData({ ...data, error: null });
      try {
        const result = await loginHandler({ email: data.email, password: data.password });
        return result;
      } catch (error) {
        setData({ ...data, error: "Correo o contraseña incorrectos" });
        return { error: "Correo o contraseña incorrectos" };
      }
    }
  };

  return { data, handleData, handleSubmit };
}
