import { useState } from "react";
import { loginHandler } from "./peticiones";
import { useRouter } from "next/navigation";

export default function useLoginState() {
  const [data, setData] = useState({ email: "", password: "", error: null });
  const router = useRouter();

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email && data.password) {
      setData({ ...data, error: "Ingrese su correo electrónico" });
    } else if (!data.password && data.email) {
      setData({ ...data, error: "Ingrese su contraseña" });
    } else if (!data.email && !data.password) {
      setData({ ...data, error: "Ingrese su correo y contraseña" });
    } else {
      setData({ ...data, error: null });
      try {
        await loginHandler({ email: data.email, password: data.password }, router);
      } catch (error) {
        setData({ ...data, error: "Correo o contraseña incorrectos" });
      }
    }
  };

  return { data, handleData, handleSubmit };
}
