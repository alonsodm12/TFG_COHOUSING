import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { updateUser } from '../api/operations';
import { UserProfile } from '../api/types';
import { UpdateUserForm } from '../components/UpdateUserForm';
import { Header } from '../../ui/Header/Header';
import { Footer } from '../../ui/Footer/Footer';

export const UpdateProfilePage = () => {


  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;


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
