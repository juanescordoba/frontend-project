import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { PeoplePage } from "../../../src/presentation/pages/PeoplePage";
import { GetPeople } from "../../../src/application/usecases/GetPeople";

jest.mock("../../../src/application/usecases/GetPeople");

describe("componente PeoplePage", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    (GetPeople as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

 it("muestra el estado de carga inicialmente y luego renderiza los datos", async () => {
    mockExecute.mockResolvedValueOnce({
      id: 1,
      name: "Luke Skywalker",
      gender: "male",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      homeworld: "Tatooine",
      vehiclesDetails: [],
    });

    render(<PeoplePage />);

    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()
    );

    expect(screen.queryByText(/Cargando/i)).not.toBeInTheDocument();
  });

   it("actualiza el ID y vuelve a llamar al caso de uso al cambiar el input", async () => {
    mockExecute
      .mockResolvedValueOnce({ id: 1, name: "Luke", vehiclesDetails: [] })
      .mockResolvedValueOnce({ id: 2, name: "C-3PO", vehiclesDetails: [] });

    render(<PeoplePage />);

    const input = screen.getByPlaceholderText(/ID del personaje/i);

    fireEvent.change(input, { target: { value: "2" } });

    await waitFor(() =>
      expect(screen.getByText("C-3PO")).toBeInTheDocument()
    );

    expect(mockExecute).toHaveBeenCalledTimes(2);
  });

  it("maneja un error en la llamada sin romper la UI", async () => {
    mockExecute.mockRejectedValueOnce(new Error("Person not found"));
    debugger;
    render(<PeoplePage />);

    await waitFor(() =>
      expect(mockExecute).toHaveBeenCalledWith(1)
    );

    expect(screen.getByText(/Api Root/i)).toBeInTheDocument();
  });
});
