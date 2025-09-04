import { CommunityProfile } from "../api/type";
import { CommunityForm } from "../components/CommunityForm";
import { createCommunity } from "../api/operations";
import { updateAdmin } from "../../users/api/operations"
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../ui/Context/UserContext";
import { useState } from "react";
import { AlertModal } from "../../ui/AlertModal/AlertModal";

const CreateCommunityPage = () => {
    const { fetchUserProfile } = useUserContext();
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleCreateCommunity = async (formData: CommunityProfile) => {
        try {
            const dataToSend = new FormData();

            const communityWithoutFile = {
                name: formData.name,
                descripcion: formData.descripcion,
                idAdmin: formData.idAdmin,
                lifestyleDTO: formData.lifestyleDTO,
                integrantes: formData.integrantes,
                latitud: formData.latitud,
                longitud: formData.longitud,
                direccion: formData.direccion,
                precio: formData.precio,
                num_integrantes: formData.num_integrantes
            };

            const communityBlob = new Blob([JSON.stringify(communityWithoutFile)], {
                type: "application/json"
            });

            dataToSend.append("community", communityBlob);

            if (formData.fotoFile) {
                dataToSend.append("foto", formData.fotoFile)
            }

            const response = await createCommunity(dataToSend);

            const communityId = response.id;
            if (username) {
                await updateAdmin(username, communityId);
            } else {
                console.warn("Username no definido en la URL");
            }

            console.log('Respuesta del servidor al crear comunidad:', response);

            setAlertMessage("¡Comunidad creada con éxito!");
            setAlertOpen(true);

            await fetchUserProfile();
            navigate("/home");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setAlertMessage("Hubo un error creando la comunidad: " + error.message);
            } else {
                setAlertMessage("Error desconocido");
            }
            setAlertOpen(true);
        }
    };

    return (
        <div id="root">
            <Header />
            <main className="page">
                <CommunityForm onSubmit={handleCreateCommunity} />
            </main>
            <Footer />

            <AlertModal
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
            />
        </div>
    );
};

export default CreateCommunityPage;
