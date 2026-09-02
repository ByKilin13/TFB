import { Link } from "react-router-dom";

function Inicio() {
    const autenticado = Boolean(
        localStorage.getItem("token")
    );

    return (
        <main>
            <section className="presentacion-inicio">
                <img
                    className="logo-universidad"
                    src="/logo_carlemany.png" ></img>
                
                <h1>Gestión de Reservas de Espacios Compartidos</h1>

                <p className="subtitulo-inicio">
                    Aplicación web para la gestión centralizada de reservas de espacios compartidos
                </p>

                <div className="acciones-inicio">
                    <Link
                        className="animated-button"
                        to="/espacios"
                    >
                        <span className="text">
                            Consultar espacios
                        </span>

                        <span className="circle"></span>
                    </Link>

                    {autenticado ? (
                        <Link
                            className="animated-button"
                            to="/reservas"
                        >
                            <span className="text">
                                Mis reservas
                            </span>

                            <span className="circle"></span>
                        </Link>
                    ) : (
                        <Link
                            className="animated-button"
                            to="/login"
                        >
                            <span className="text">
                                Iniciar sesión
                            </span>

                            <span className="circle"></span>
                        </Link>
                    )}
                </div>
            </section>


            <section className="informacion-academica">
                <h2>Proyecto académico</h2>

                <p>
                    Trabajo final de Bàtxelor en informática
                </p>

                <p>
                    Desarrollo de aplicación web para la gestión de reservas de espacios compartidos
                </p>

                <p>
                    Nicolás Kilin Guindo - Curso 2025-2026
                </p>
            </section>
        </main>
    );
}


export default Inicio;