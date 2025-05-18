import { CommunityProfile } from "../api/type";
import { CommunityForm } from "../components/CommunityForm";
import { createCommunity } from "../api/operations";
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";

const CreateCommunityPage = () => {
    const handleCreateCommunity = async (formData: CommunityProfile) => {
        try {
            // Llamamos a la función createCommunity para enviar los datos al servidor
            const response = await createCommunity(formData);

            // Uso de la variable response (por ejemplo, log para depuración)
            console.log('Respuesta del servidor al crear comunidad:', response);

            alert('Comunidad creada con éxito!');
        } catch (error: unknown) {
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
