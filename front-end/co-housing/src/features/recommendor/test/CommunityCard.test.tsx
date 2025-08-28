import { render, screen, fireEvent } from "@testing-library/react";
import CommunityCard from "../components/CommunityCard";

vi.mock("../api/operations", () => ({
  UnirseComuniadad: vi.fn().mockResolvedValue({}),
  addComunidad: vi.fn().mockResolvedValue({}),
  removeComunidad: vi.fn().mockResolvedValue({}),
}));

describe("CommunityCard", () => {
  const baseProps = {
    id: 1,
    name: "Cohousing Granada",
    descripcion: "Comunidad de prueba",
    tranquilidad: 5,
    actividad: 4,
    limpieza: 5,
    compartir_espacios: 3,
    sociabilidad: 4,
    precio: 250,
    affinity: 90,
    userId: 123,
    username: "Alonso",
    admin: 99,
    comunidadesGuardadas: [],
    direccion: "Falsa",
    numIntegrantes: 2,
    latitud: 1.2,
    longitud: 1.5,
    integrantes: [1,2]

  };

  test("renderiza el nombre de la comunidad", () => {
    render(<CommunityCard {...baseProps} />);
    expect(screen.getByText("Cohousing Granada")).toBeInTheDocument();
  });

  test("permite enviar solicitud de unión", async () => {
    render(<CommunityCard {...baseProps} idComunidad={0} />);
    
    const joinButton = screen.getByRole("button", { name: /solicitar unión/i });
    fireEvent.click(joinButton);

    // después del click, el texto debería cambiar
    expect(await screen.findByText(/solicitud enviada/i)).toBeInTheDocument();
  });
});
