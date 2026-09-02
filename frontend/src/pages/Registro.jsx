import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";


function Registro({ onRegistro }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const navigate = useNavigate();

    async function registrarUsuario(evento) {
        evento.preventDefault();

        setError("");
        setEnviando(true);

        try {
            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/registro/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            const datos = await respuesta.json();
            console.log(datos);

            if (!respuesta.ok) {
                let mensaje =
                    "No se pudo completar el registro.";

                if (datos.username) {
                    mensaje = datos.username[0];
                } else if (datos.email) {
                    mensaje = datos.email[0];
                } else if (datos.password) {
                    mensaje = datos.password[0];
                }

                throw new Error(mensaje);
            }

            localStorage.setItem(
                "token",
                datos.token
            );

            onRegistro();

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
                <h1>Crear una cuenta</h1>

                <form onSubmit={registrarUsuario}>
                    <label htmlFor="username">
                        Nombre de usuario
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(evento) =>
                            setUsername(evento.target.value)
                        }
                        required
                    />

                    <label htmlFor="email">
                        Correo electrónico
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(evento) =>
                            setEmail(evento.target.value)
                        }
                        required
                    />

                    <label htmlFor="password">
                        Contraseña
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(evento) =>
                            setPassword(evento.target.value)
                        }
                        minLength="6"
                        required
                    />

                    <button
                        type="submit"
                        className="animated-button"
                        disabled={enviando}
                    >
                        <span className="text">
                            {enviando
                                ? "Creando cuenta..."
                                : "Crear cuenta"}
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
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/login">
                        Inicia sesión
                    </Link>
                </p>
            </section>
        </main>
    );
}


export default Registro;