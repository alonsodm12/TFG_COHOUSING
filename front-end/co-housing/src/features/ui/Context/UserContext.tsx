// src/context/UserContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getUsernameFromToken, getRoleFromToken } from "../../authUtils";
import { fetchUserByUsername } from "../../users/api/operations"; // Ajusta la ruta si es necesario
import { UserProfile } from "../../users/api/types";

interface UserContextType {
  username: string | null;
  role: string | null;
  userProfile: UserProfile | null;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
  fetchUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const tokenUsername = getUsernameFromToken();
    const tokenRole = getRoleFromToken();
    setUsername(tokenUsername);
    setRole(tokenRole);
  
    if (tokenUsername) {
      fetchUserByUsername(tokenUsername)
        .then((profile) => setUserProfile(profile))
        .catch((error) =>
          console.error("Error al obtener el perfil del usuario:", error)
        );
    }
  }, []);

  const fetchUserProfile = async () => {
    if (!username) return;
    try {
      const profile = await fetchUserByUsername(username);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        username,
        role,
        userProfile,
        setUsername,
        setRole,
        fetchUserProfile,
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
