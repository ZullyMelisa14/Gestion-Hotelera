import useLoginState from "@/utils/useLoginState";

export default function LoginForm() {
  const { data, handleData, handleSubmit } = useLoginState();

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleData}
        placeholder="Correo electrónico"
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleData}
        placeholder="Contraseña"
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      {data.error && (
        <p style={{ color: "red", marginBottom: 10 }}>{data.error}</p>
      )}
      <button type="submit" style={{ width: "100%" }}>
        Iniciar sesión
      </button>
    </form>
  );
}