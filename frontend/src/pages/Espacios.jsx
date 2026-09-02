import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Espacios() {
    const [espacios, setEspacios] = useState([]); //datos recibidos
    const [cargando, setCargando] = useState(true); //saber si sigue en proceso
    const [error, setError] = useState(""); // mensaje si hay fallo

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/espacios/")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(
                        "No se pudieron obtener los espacios."
                    );
                }

                return respuesta.json();
            })
            .then((datos) => {
                setEspacios(datos);
            })
            .catch((errorPeticion) => {
                setError(errorPeticion.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    return (
        <main>
            <h1>Espacios disponibles</h1>

            {cargando && (
                <p>Cargando espacios...</p>
            )}

            {error && (
                <p className="mensaje-error">
                    {error}
                </p>
            )}

            {!cargando &&
                !error &&
                espacios.length === 0 && (
                    <p>
                        No hay espacios disponibles.
                    </p>
                )}

            <div className="lista-espacios">
                {espacios.map((espacio) => (
                    <article
                        className="tarjeta-espacio"
                        key={espacio.id}
                    >
                        <h2>{espacio.nombre}</h2>

                        <p>
                            {espacio.descripcion ||
                                "Sin descripción."}
                        </p>

                        <p>
                            <strong>Capacidad:</strong>{" "}
                            {espacio.capacidad}
                        </p>

                        <p>
                            <strong>Localización:</strong>{" "}
                            {espacio.localizacion ||
                                "No indicada"}
                        </p>

                        <p>
                            <Link
                                className="animated-button"
                                to={`/reservar/${espacio.id}`}
                            >
                                <span className="text">
                                    Reservar
                                </span>

                                <span className="circle"></span>
                            </Link> 
                        </p>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Espacios;