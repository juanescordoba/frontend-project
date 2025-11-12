import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { VehiclePage } from "../../../src/presentation/pages/VehiclePage";
import { GetVehicle } from "../../../src/application/usecases/GetVehicle";

jest.mock("../../../src/application/usecases/GetVehicle");

describe("componente VehiclePage", () => {
  const mockExecute = jest.fn();

  beforeEach(() => {
    (GetVehicle as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("muestra el estado de carga y luego renderiza los datos", async () => {
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
      vehiclesDetails: [
        { name: "X-wing", model: "T-65", manufacturer: "Incom", cost_in_credits: "149999" },
      ],
    });

    render(<VehiclePage />);

    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()
    );

    expect(screen.getByText(/X-wing/i)).toBeInTheDocument();

    expect(screen.queryByText(/Cargando/i)).not.toBeInTheDocument();
  });

  it("actualiza el ID y vuelve a llamar al caso de uso al cambiar el input", async () => {
    mockExecute
      .mockResolvedValueOnce({ id: 1, name: "Luke", vehiclesDetails: [] })
      .mockResolvedValueOnce({ id: 2, name: "C-3PO", vehiclesDetails: [] });

    render(<VehiclePage />);

    const input = screen.getByPlaceholderText(/ID del personaje/i);
    fireEvent.change(input, { target: { value: "2" } });

    await waitFor(() =>
      expect(screen.getByText("C-3PO")).toBeInTheDocument()
    );

    expect(mockExecute).toHaveBeenCalledTimes(2);
  });

  it("muestra los datos correctamente", async () => {
    mockExecute.mockResolvedValueOnce({
      id: 1,
      name: "Luke Skywalker",
      vehiclesDetails: [
        { name: "X-wing", model: "T-65", manufacturer: "Incom", cost_in_credits: "149999" },
      ],
    });

    render(<VehiclePage />);

    await screen.findByText("Luke Skywalker");

    expect(mockExecute).toHaveBeenCalledWith(1);
  });

  it("maneja correctamente un error en la llamada sin romper la UI", async () => {
    mockExecute.mockRejectedValueOnce(new Error("Person not found"));

    render(<VehiclePage />);

    await waitFor(() =>
      expect(mockExecute).toHaveBeenCalledWith(1)
    );

    expect(screen.getByText("Api Root")).toBeInTheDocument();
  });
});
