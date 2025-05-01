import React from "react";
import { CommunityProfile } from "../api/type";
import { CommunityForm } from "../components/CommunityForm";  // Asegúrate de importar correctamente
import { updateCommunity } from "../api/operations";  // Asegúrate de importar desde el archivo correcto
import { useLocation } from "react-router-dom";

const UpdateCommunityPage: React.FC = () => {

    const location = useLocation();
    const { community } = location.state || {};

    const handleUpdateCommunity = async (formData: CommunityProfile) => {
        try {
            // Llamamos a la función createCommunity para enviar los datos al servidor
            const response = await updateCommunity(formData);

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
        <div>
            <h1>Editar Comunidad</h1>
            <CommunityForm initialData={community} onSubmit={handleUpdateCommunity} />
        </div>
    );
};

export default UpdateCommunityPage;
