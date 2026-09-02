import { useState } from "react";
import {Route,Routes,useNavigate} from "react-router-dom";
import Espacios from "./pages/Espacios";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Reservas from "./pages/Reservas";
import Registro from "./pages/Registro";
import Navegacion from "./components/Navegacion";
import NuevaReserva from "./pages/NuevaReserva";
import "./App.css";


function App() {
    const [autenticado, setAutenticado] = useState(
        Boolean(localStorage.getItem("token"))
    );

    const navigate = useNavigate();

    function guardarSesion() {
        setAutenticado(true);
    }

    function cerrarSesion() {
        localStorage.removeItem("token");
        setAutenticado(false);
        navigate("/");
    }

    return (
        <>
           <Navegacion
                autenticado={autenticado}
                cerrarSesion={cerrarSesion}
            /> 

            <Routes>
                <Route
                    path="/"
                    element={<Inicio />}
                />

                <Route
                    path="/espacios"
                    element={<Espacios />}
                />

                <Route
                    path="/reservas"
                    element={<Reservas />}
                />

                <Route
                    path="/login"
                    element={
                        <Login onLogin={guardarSesion} />
                    }
                />

                <Route
                    path="/registro"
                    element={<Registro onRegistro={guardarSesion} /> }
                />

                <Route
                    path="/reservar/:espacioId"
                    element={<NuevaReserva />}
                    />

                <Route
                    path="*"
                    element={
                        <main>
                            <h1>Página no encontrada</h1>

                            <p>
                                Esta dirección no existe
                            </p>
                        </main>
                    }
                />
            </Routes>
        </>
    );
}

export default App;