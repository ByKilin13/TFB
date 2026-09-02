import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const navigate = useNavigate();

    async function iniciarSesion(evento) {
        evento.preventDefault();

        setError("");
        setEnviando(true);

        try {
            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    "El usuario o la contraseña no son correctos."
                );
            }

            localStorage.setItem( //esto para solución comercial habría que cambiarlo
                "token",
                datos.token
            ); 

            onLogin();

            navigate("/espacios");
        } catch (errorPeticion) {
            setError(errorPeticion.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main>
            <section className="contenedor-formulario">
                <h1>Iniciar sesión</h1>

                <form onSubmit={iniciarSesion}>
                    <label htmlFor="username">
                        Nombre de usuario
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(evento) => {
                            setUsername(evento.target.value);
                        }}
                        required
                    />

                    <label htmlFor="password">
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(evento) => {
                            setPassword(evento.target.value);
                        }}
                        required
                    />

                    <button
                        type="submit"
                        className="animated-button"
                        disabled={enviando}
                    >
                        <span className="text">
                            {enviando
                                ? "Iniciando sesión..."
                                : "Iniciar sesión"}
                        </span>

                        <span className="circle"></span>
                    </button>
                </form>

                {error && (
                    <p className="mensaje-error">
                        {error}
                    </p>
                )}

                <p>
                    ¿Todavía no tienes una cuenta?{" "}
                    <Link to="/registro">
                        Regístrate
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;