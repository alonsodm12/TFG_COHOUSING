import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SolicitudesPage from "../pages/SolicitudesPage";
import { vi } from "vitest";

// Mock de la API
vi.mock("../api/operations", () => ({
  getSolicitudesUsuario: vi.fn().mockResolvedValue([
    { id: 1, tipo: "compleja", descripcion: "Solicitud de prueba 1" },
    { id: 2, tipo: "basica", descripcion: "Solicitud de prueba 2" }
  ]),
  aceptarSolicitud: vi.fn().mockResolvedValue({}),
  rechazarSolicitud: vi.fn().mockResolvedValue({}),
  eliminarSolicitud: vi.fn().mockResolvedValue({})
}));

describe("SolicitudesPage", () => {
  it("muestra las solicitudes activas del usuario", async () => {
    render(
      <MemoryRouter initialEntries={["/solicitudes/123"]}>
        <Routes>
          <Route path="/solicitudes/:userId" element={<SolicitudesPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Espera a que la primera solicitud aparezca
    expect(await screen.findByText(/Solicitud #1/i)).toBeInTheDocument();
    expect(screen.getByText(/Solicitud de prueba 1/i)).toBeInTheDocument();

    // Segunda solicitud
    expect(screen.getByText(/Solicitud #2/i)).toBeInTheDocument();
    expect(screen.getByText(/Solicitud de prueba 2/i)).toBeInTheDocument();
  });

  it("botón de actualizar solicitudes se puede clickar", async () => {
    render(
      <MemoryRouter initialEntries={["/solicitudes/123"]}>
        <Routes>
          <Route path="/solicitudes/:userId" element={<SolicitudesPage />} />
        </Routes>
      </MemoryRouter>
    );

    const updateButton = screen.getByRole("button", { name: /actualizar solicitudes/i });
    fireEvent.click(updateButton);

    // Espera que la primera solicitud siga visible después de refrescar
    expect(await screen.findByText(/Solicitud #1/i)).toBeInTheDocument();
  });
});
