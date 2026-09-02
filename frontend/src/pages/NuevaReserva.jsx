import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";


function NuevaReserva() {
    const { espacioId } = useParams();

    const [espacio, setEspacio] = useState(null);
    const [fecha, setFecha] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/espacios/")
            .then((respuesta) => respuesta.json())
            .then((espacios) => {
                const encontrado = espacios.find(
                    (espacio) =>
                        espacio.id === Number(espacioId)
                );

                setEspacio(encontrado);
            })
            .catch(() => {
                setError("No se pudo cargar el espacio.");
            });
    }, [espacioId]);

    async function crearReserva(evento) {
        evento.preventDefault();

        const token = localStorage.getItem("token");

        setError("");
        setMensaje("");

        try {
            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/reservas/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },

                    body: JSON.stringify({
                        espacio: Number(espacioId),
                        fecha: fecha,
                        hora_inicio: horaInicio,
                        hora_fin: horaFin,
                    }),
                }
            );

            const datos = await respuesta.json();
            
            if (!respuesta.ok) {
                throw new Error(
                    datos.error ||
                    "No se pudo crear la reserva."
                );
            }

            setMensaje(
                "Reserva creada correctamente."
            );

            setFecha("");
            setHoraInicio("");
            setHoraFin("");

        }
        catch (errorPeticion) {
        setError(errorPeticion.message);
        }
    }

        if (!espacio) {
            return (
                <main>
                    <p>
                        {error || "Cargando espacio..."}
                    </p>

                    <Link to="/espacios">
                        Volver a espacios
                    </Link>
                </main>
            );
    }

    return (
        <main>
            <section className="contenedor-formulario">
                <h1>Nueva reserva</h1>

                <h2>{espacio.nombre}</h2>

                <p>
                    <strong>Localización:</strong>{" "}
                    {espacio.localizacion ||
                        "No indicada"}
                </p>

                <form onSubmit={crearReserva}>
                    <label htmlFor="fecha">
                        Fecha
                    </label>

                    <input
                        id="fecha"
                        type="date"
                        value={fecha}
                        min={
                            new Date()
                                .toISOString()
                                .split("T")[0]
                        }
                        onChange={(evento) =>
                            setFecha(evento.target.value)
                        }
                        required
                    />

                    <label htmlFor="horaInicio">
                        Hora inicio
                    </label>

                    <input
                        id="horaInicio"
                        type="time"
                        value={horaInicio}
                        onChange={(evento) =>
                            setHoraInicio(
                                evento.target.value
                            )
                        }
                        required
                    />

                    <label htmlFor="horaFin">
                        Hora final
                    </label>

                    <input
                        id="horaFin"
                        type="time"
                        value={horaFin}
                        onChange={(evento) =>
                            setHoraFin(
                                evento.target.value
                            )
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="animated-button"
                    >
                        <span className="text">
                            Confirmar reserva
                        </span>

                        <span className="circle"></span>
                    </button>
                </form>

                {error && (
                    <p className="mensaje-error">
                        {error}
                    </p>
                )}

                {mensaje && (
                    <p className="mensaje-correcto">
                        {mensaje}
                    </p>
                )}

                <p>
                    <Link to="/espacios">
                        Volver a espacios
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default NuevaReserva;