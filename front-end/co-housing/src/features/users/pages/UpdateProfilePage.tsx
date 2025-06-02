import { UpdateUserForm } from '../components/UpdateUserForm';
import { Header } from '../../ui/Header/Header';
import { Footer } from '../../ui/Footer/Footer';
import { useLocation } from 'react-router-dom';

export const UpdateProfilePage = () => {

  const location = useLocation();
  const user = location.state;
  //const storedUser = localStorage.getItem("currentUser");
  //const user = storedUser ? JSON.parse(storedUser) : null;


  return (
    <div id="root">
      <Header />
      <main className="page">
        <UpdateUserForm user={user}/>
      </main>
      <Footer />
    </div>
  );
  
};
