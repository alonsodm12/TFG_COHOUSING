import React from "react";
import { CommunityProfile } from "../api/type";
import { CommunityForm } from "../components/CommunityForm";  // Asegúrate de importar correctamente
import { createCommunity } from "../api/operations";  // Asegúrate de importar desde el archivo correcto
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

const CreateCommunityPage = () => {
    const handleCreateCommunity = async (formData: CommunityProfile) => {
        try {
            // Llamamos a la función createCommunity para enviar los datos al servidor
            const response = await createCommunity(formData);

            // Si la respuesta es exitosa, se puede mostrar un mensaje o redirigir
            alert('Comunidad creada con éxito!');
            // Aquí podrías hacer una redirección o limpiar el formulario, dependiendo de tus necesidades
        } catch (error: unknown) {
            // Manejo del error
            if (error instanceof Error) {
                alert('Hubo un error creando la comunidad: ' + error.message);
            } else {
                alert('Error desconocido');
            }
        }
    };

    return (
        <div id="root">
            <Header />
            <main className="page">
                <CommunityForm onSubmit={handleCreateCommunity} />
            </main>
            <Footer/>
        </div>
    );
};

export default CreateCommunityPage;
