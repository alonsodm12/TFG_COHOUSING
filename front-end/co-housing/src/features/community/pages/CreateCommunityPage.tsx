import { CommunityProfile } from "../api/type";
import { CommunityForm } from "../components/CommunityForm";
import { createCommunity } from "../api/operations";
import { updateAdmin } from "../../users/api/operations"
import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../ui/Context/UserContext";

const CreateCommunityPage = () => {
    const { fetchUserProfile } = useUserContext();
    const navigate = useNavigate();
    const { username } = useParams<{ username: string }>();
    const handleCreateCommunity = async (formData: CommunityProfile) => {

        try {
            const dataToSend = new FormData();
            //Procedemos a construir con Blob el Json que espera el backend
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

            dataToSend.append("community",communityBlob);

            if (formData.fotoFile) {
                dataToSend.append("foto", formData.fotoFile)
            }

            // Llamamos a la función createCommunity para enviar los datos al servidor
            const response = await createCommunity(dataToSend);

            const communityId = response.id;
            if (username) {
                await updateAdmin(username, communityId); // Ahora username sí está definido
              } else {
                console.warn("Username no definido en la URL");
              }

            // Uso de la variable response (por ejemplo, log para depuración)
            console.log('Respuesta del servidor al crear comunidad:', response);

            alert('Comunidad creada con éxito!');
            await fetchUserProfile();
            navigate("/home");
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
