import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useState } from "react";
import { Tarea } from "../api/type";
import { createTask } from "../api/operations";
import TaskForm from "../components/TaskForm";
import { useParams } from 'react-router-dom';
import { AlertModal } from "../../ui/AlertModal/AlertModal";

const CreateTask = () => {
    const { idComunidad } = useParams();
    const [task, setTask] = useState<Tarea>({
        id: 0,
        titulo: '',
        descripcion: '',
        usuariosParticipantes: [],
        fechaTope: '',
        idComunidad: 0,
        numParticipantes: 0,
        estado: 'PENDIENTE',
        duracion: 0,
        asignacion: "AHORA"
    });

    // Estados para el modal de alerta
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const taskToSend = { ...task, idComunidad: Number(idComunidad) || 0 };
            await createTask(taskToSend);

            setAlertMessage("Tarea creada con éxito");
            setAlertOpen(true);

        } catch (error: any) {

            setAlertMessage(`Error: ${error.message}`);
            setAlertOpen(true);
        }
    }

    return (
        <div id="root">
            <Header />
            <main className="page">
                <TaskForm task={task} setTask={setTask} onSubmit={handleTaskSubmit}/>
            </main>
            <Footer/>

            <AlertModal
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
            />
        </div>
    );
};

export default CreateTask;
