import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchUserByUsername } from "../../users/api/operations";
import { UserProfile } from "../../users/api/types";

interface UserContextType {
  username: string | null;
  role: string | null;
  userProfile: UserProfile | null;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
  fetchUserProfile: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, _setUsername] = useState<string | null>(null);
  const [role, _setRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Cargar username y role desde localStorage al montar
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUsername) _setUsername(storedUsername);
    if (storedRole) _setRole(storedRole);
  }, []);

  // Función para actualizar username y persistirlo
  const setUsername = (username: string | null) => {
    _setUsername(username);
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  };

  // Función para actualizar role y persistirlo
  const setRole = (role: string | null) => {
    _setRole(role);
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  };

  const fetchUserProfile = async () => {
    if (!username) {
      setUserProfile(null);
      return;
    }
    setIsLoading(true);
    try {
      const profile = await fetchUserByUsername(username);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [username]);

  return (
    <UserContext.Provider
      value={{
        username,
        role,
        userProfile,
        setUsername,
        setRole,
        fetchUserProfile,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de <UserProvider>");
  }
  return context;
};
