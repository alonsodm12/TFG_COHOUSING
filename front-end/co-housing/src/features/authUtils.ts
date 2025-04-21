import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;         // el "subject", suele ser el username o ID
  role: string;
}

export const getUsernameFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.sub; // ajusta si tu JWT tiene otro campo para username
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return null;
  }
};

export const getRoleFromToken = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.role; // ajusta si tu JWT tiene otro campo para username
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  };