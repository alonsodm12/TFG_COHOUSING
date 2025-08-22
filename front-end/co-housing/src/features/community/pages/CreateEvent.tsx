import { Header } from "../../ui/Header/Header";
import { Footer } from "../../ui/Footer/Footer";
import EventoForm from "../components/EventoForm";

const CreateEvent = () => {
    return (
        <div id="root">
            <Header />
            <main className="page">
                <EventoForm />
            </main>
            <Footer/>
        </div>
    );
};

export default CreateEvent;
