'use client';
import { useState } from "react";
import { actualizarEstadoLimpiezaHabitacion } from "@/utils/peticiones";
import CardContent from "@/app/components/Cards/GlobalCard";
import '../styles/Limpieza.css';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

const CardLimpieza = ({ habitacion }) => {
    // Si no existe el campo, asume "sucio"
    const [cleanState, setCleanState] = useState(habitacion.estado_limpieza || 'sucio ');
    const [cleaning, setCleaning] = useState(false);

    const iniciarLimpieza = async () => {
        if (cleanState === 'sucio ') {
            setCleanState('en limpieza');
            setCleaning(true);
            // Esto creará el campo si no existe
            await actualizarEstadoLimpiezaHabitacion(habitacion.id, 'en limpieza');
        }
    };

    const terminarLimpieza = async () => {
        if (cleanState === 'en limpieza') {
            setCleanState('limpio ');
            setCleaning(false);
            await actualizarEstadoLimpiezaHabitacion(habitacion.id, 'limpio ');
            await marcarDisponible(habitacion.id);
        }
    };

    const marcarDisponible = async (id) => {
        const docRef = doc(db, "habitaciones", id);
        await updateDoc(docRef, { estado: "disponible" });
    };

    return (
        <>
            <CardContent habitacion={habitacion}>
                <div className="card-status">
                    <span className="status-text">
                        {cleanState === 'sucio ' && 'SUCIA'}
                        {cleanState === 'en limpieza' && 'EN LIMPIEZA'}
                        {cleanState === 'limpio ' && 'LIMPIA'}
                    </span>
                    <span>
                        {cleanState === 'sucio ' && '💔'}
                        {cleanState === 'en limpieza' && '🛠️'}
                        {cleanState === 'limpio ' && '💚'}
                    </span>
                    {cleanState === 'sucio ' && (
                        <button
                            className="cleanButton"
                            onClick={iniciarLimpieza}
                            disabled={cleanState === 'limpio ' || cleaning}
                        >
                        Limpiar
                        </button>
                    )}
                    {cleanState === 'en limpieza' && (
                        <button className="cleanButton" onClick={terminarLimpieza}>
                            Finalizar
                        </button>
                    )}
                </div>
            </CardContent>
        </>
    );
};

export default CardLimpieza;
