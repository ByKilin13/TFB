import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [espacios, setEspacios] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/espacios/")
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                setEspacios(datos);
            })
            .catch((error) => {
                console.error(
                    "Error al consultar los espacios:",
                    error
                );
            });
    }, []);

    return (
        <main>
            <h1>Reserva de espacios</h1>

            <h2>Espacios disponibles</h2>

            {espacios.length === 0 ? (
                <p>No hay espacios disponibles.</p>
            ) : (
                <ul>
                    {espacios.map((espacio) => (
                        <li key={espacio.id}>
                            <strong>{espacio.nombre}</strong>
                            {" - "}
                            {espacio.localizacion}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default App;