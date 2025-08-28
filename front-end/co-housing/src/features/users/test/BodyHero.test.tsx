import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BodyHero from "../components/BodyHero";

// Mock del contexto
const mockUseUserContext = {
  userProfile: { 
    id: 1, 
    username: "Alonso", 
    role: null, 
    idComunidad: null 
  },
  isLoading: false
};

vi.mock("../../ui/Context/UserContext", () => ({
  useUserContext: () => mockUseUserContext
}));

describe("BodyHero", () => {
  it("muestra mensaje de bienvenida si hay perfil", () => {
    render(
      <MemoryRouter>
        <BodyHero />
      </MemoryRouter>
    );

    // Chequea que el nombre de usuario aparece
    expect(screen.getByText(/hola alonso/i)).toBeInTheDocument();
  });

  it("filtra el botón 'Crear Comunidad' si ya tiene comunidad", () => {
    // Perfil con comunidad
    const mockWithCommunity = {
      userProfile: { id: 1, username: "Alonso", role: "ofertante", idComunidad: 2 },
      isLoading: false
    };

    vi.mock("../../ui/Context/UserContext", () => ({
      useUserContext: () => mockWithCommunity
    }));

    render(
      <MemoryRouter>
        <BodyHero />
      </MemoryRouter>
    );

    // El botón "Crear Comunidad" NO debe aparecer
    const button = screen.queryByText(/crear comunidad/i);
    expect(button).toBeNull();
  });
});