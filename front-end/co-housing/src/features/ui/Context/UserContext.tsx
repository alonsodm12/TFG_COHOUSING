import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getUsernameFromToken, getRoleFromToken } from "../../authUtils";
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
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cargar perfil cuando el username cambie (tras login)
  useEffect(() => {
    if (!username) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    console.log(username);
    fetchUserByUsername(username)
      .then((profile) => {
        setUserProfile(profile);
      })
      .catch((error) => {
        console.error("Error al obtener el perfil del usuario:", error);
        // Mostrar detalles adicionales del error
        console.log(username);
        if (error instanceof Error) {
          console.error("Detalles del error:", error.message);
        } else {
          console.error("Respuesta de error desconocida:", error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username]);

  // Función reutilizable para recargar el perfil manualmente
  const fetchUserProfile = async () => {
    if (!username) return;
    setIsLoading(true);
    try {
      const profile = await fetchUserByUsername(username);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    } finally {
      setIsLoading(false);
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
