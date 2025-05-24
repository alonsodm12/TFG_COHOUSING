import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
  const [username, setUsername] = useState<string | null>(getUsernameFromToken());
  const [role, setRole] = useState<string | null>(getRoleFromToken());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 🔁 Se ejecuta cada vez que cambia el username
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) {
        setUserProfile(null);
        setIsLoading(false);
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

    loadProfile();
  }, [username]);

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
