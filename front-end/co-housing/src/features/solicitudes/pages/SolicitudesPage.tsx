import React, { useEffect, useState } from "react";
import { SolicitudesDTO } from "../api/types";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useParams } from "react-router-dom";
import { getSolicitudesUsuario } from "../api/operations";

const SolicitudesPage: React.FC = () => {

    const { userId } = useParams();
    const [solicitudes,setSolicitudes] = useState<SolicitudesDTO[]>([]);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            if (!userId) return;
            try{
                const data = await getSolicitudesUsuario(userId);
                setSolicitudes(data);
            } catch(error){
                console.error(error);
            }
        };

        fetchSolicitudes();
    }, [userId]);

    return (
        <div id="root">
            <Header />
            <main className="page">
                {solicitudes.map((solicitud,index) => (
                    <div key={index}>
                        <p>{solicitud.descripcion}</p>
                    </div>
                ))}
            </main>
            <Footer />
        </div>
    )

}

export default SolicitudesPage;