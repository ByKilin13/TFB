import { Link } from "react-router-dom";


function Navegacion({
    autenticado,
    cerrarSesion,
}) {
    return (
        <header className="cabecera">
            <div className="contenedor-navegacion">
                <nav className="nav-animada">
                    <div className="container-nav">
                        <Link
                            className="btn-nav"
                            to="/"
                        >
                            Inicio
                        </Link>

                        <Link
                            className="btn-nav"
                            to="/espacios"
                        >
                            Espacios
                        </Link>

                        {autenticado ? (
                            <>
                                <Link
                                    className="btn-nav"
                                    to="/reservas"
                                >
                                    Mis reservas
                                </Link>

                                <button
                                    type="button"
                                    className="btn-nav"
                                    onClick={cerrarSesion}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="btn-nav"
                                    to="/login"
                                >
                                    Iniciar sesión
                                </Link>

                                <Link
                                    className="btn-nav"
                                    to="/registro"
                                >
                                    Registro
                                </Link>
                            </>
                        )}

                        <svg
                            className="outline-nav"
                            viewBox="0 0 500 60"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <rect
                                className="rect-nav"
                                x="2"
                                y="2"
                                width="496"
                                height="56"
                                rx="8"
                            />
                        </svg>
                    </div>
                </nav>
            </div>
        </header>
    );
}


export default Navegacion;
``