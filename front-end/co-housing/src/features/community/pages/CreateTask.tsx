import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useState } from "react";
import { Tarea } from "../api/type";
import { createTask } from "../api/operations";
import TaskForm from "../components/TaskForm";
import { useParams } from 'react-router-dom';

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
    });

    const handleTaskSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const taskToSend = { ...task, idComunidad: Number(idComunidad) || 0 };
            const response = await createTask(taskToSend);
            alert("Tarea creada con exito");
        } catch (error: any) {
            alert(`${error.message}`);
        }
    }

    return (
        <div id="root">
            <Header />
            <main className="page">
                <TaskForm task={task} setTask={setTask} onSubmit={handleTaskSubmit} />
            </main>
            <Footer/>
        </div>
    );
};

export default CreateTask;
