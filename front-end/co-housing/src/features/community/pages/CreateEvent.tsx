import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useState } from "react";
import { Evento } from "../api/type";
import { createEvent } from "../api/operations";
import { useParams } from 'react-router-dom';
import EventoForm from "../components/EventoForm";

const CreateEvent = () => {
    const { idComunidad } = useParams();
    const [evento, setEvento] = useState<Evento>({
        titulo: '',
        descripcion: '',
        usuariosParticipantes: [],
        fechaTope: '',
        lugar: '',
        horaInicio: 0,
        horaFinal: 0,
        idComunidad: 0,
        numParticipantes: 0,
    });

    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const taskToSend = { ...evento, idComunidad: Number(idComunidad) || 0 };
            const response = await createEvent(taskToSend);


        } catch (error: any) {
            alert(`${error.message}`);
        }
    }

    return (
        <div id="root">
            <Header />
            <main className="page">
                <EventoForm evento={evento} setEvento={setEvento} onSubmit={handleTaskSubmit} />
            </main>
            <Footer/>
        </div>
    );
};

export default CreateEvent;
