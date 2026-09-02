import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("todas");

    useEffect(() => {
        consultarReservas();
    }, []);

    async function consultarReservas() {
        const token = localStorage.getItem("token");

        if (!token) {
            setError(
                "Debes iniciar sesión para consultar tus reservas."
            );
            setCargando(false);
            return;
        }

        try {
            const respuesta = await fetch(
                "http://127.0.0.1:8000/api/reservas/",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    "No se pudieron consultar las reservas."
                );
            }

            setReservas(datos);
        } catch (errorPeticion) {
            setError(errorPeticion.message);
        } finally {
            setCargando(false);
        }
    }
    async function cancelarReserva(reservaId) {
        const token = localStorage.getItem("token");

        if (!token) {
            setError(
                "Debes iniciar sesión para cancelar una reserva."
            );
            return;
        }

        const confirmar = window.confirm(
            "¿Seguro que quieres cancelar esta reserva?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const respuesta = await fetch(
                `http://127.0.0.1:8000/api/reservas/${reservaId}/cancelar/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(
                    datos.mensaje ||
                    "No se pudo cancelar la reserva."
                );
            }

            setReservas((reservasActuales) =>
                reservasActuales.map((reserva) =>
                    reserva.id === reservaId
                        ? {
                            ...reserva,
                            estado: "cancelada",
                        }
                        : reserva
                )
            );
        } catch (errorPeticion) {
            setError(errorPeticion.message);
        }
    }


    const hoy = new Date();

    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    const fechaActual = `${año}-${mes}-${dia}`;

    const reservasMostradas = reservas.filter((reserva) => {
        if (filtro === "todas") {
            return true;
        }

        return (reserva.estado === "activa" && reserva.fecha >= fechaActual);
    });

    return (
        <main>
            <h1>Mis reservas</h1>

            <div className="filtros-reservas">
                <button
                    type="button"
                    className={
                        filtro === "todas"
                            ? "animated-button activo"
                            : "animated-button"
                    }
                    onClick={() => setFiltro("todas")}
                >
                    <span className="text">Todas</span>
                    <span className="circle"></span>
                </button>

                <button
                    type="button"
                    className={
                        filtro === "proximas"
                            ? "animated-button activo"
                            : "animated-button"
                    }
                    onClick={() => setFiltro("proximas")}
                >
                    <span className="text">Próximas</span>
                    <span className="circle"></span>
                </button>
            </div>

            {cargando && (
                <p>Cargando reservas...</p>
            )}

            {error && (
                <div>
                    <p className="mensaje-error">
                        {error}
                    </p>

                    <Link to="/login">
                        Ir al inicio de sesión
                    </Link>
                </div>
            )}

            {!cargando &&
                !error &&
                reservasMostradas.length === 0 && (
                    <p>
                        {filtro === "proximas"
                            ? "No tienes reservas próximas"
                            : "Todavía no tienes ninguna reserva"}
                    </p>
                )}

            {!cargando &&
                !error &&
                reservasMostradas.length > 0 && (
                    <div className="lista-reservas">
                        {reservasMostradas.map((reserva) => (
                            <article
                                className="tarjeta-reserva"
                                key={reserva.id}
                            >
                                <h2>
                                    {reserva.nombre_espacio}
                                </h2>

                                <p>
                                    <strong>Fecha:</strong>{" "}
                                    {reserva.fecha}
                                </p>

                                <p>
                                    <strong>Horario:</strong>{" "}
                                    {reserva.hora_inicio.slice(0,5)}
                                    {" - "}
                                    {reserva.hora_fin.slice(0,5)}
                                </p>

                                <p>
                                    <strong>Estado:</strong>{" "}
                                    <span
                                        className={
                                            reserva.estado ===
                                            "activa"
                                                ? "estado-activa"
                                                : "estado-cancelada"
                                        }
                                    >
                                        {reserva.estado}
                                    </span>
                                </p>
                                <p>
                                    {reserva.estado === "activa" && (
                                        <button
                                            type="button"
                                            className="boton-cancelar"
                                            onClick={() =>
                                                cancelarReserva(reserva.id)
                                            }
                                        >
                                            Cancelar reserva
                                        </button>
                                    )}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
        </main>
    );
}


export default Reservas;