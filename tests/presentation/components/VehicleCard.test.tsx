import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { VehicleCard } from "../../../src/presentation/components/VehicleCard";

describe("componente VehicleCard", () => {
  const mockPersonWithVehicles = {
    id: 1,
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "Tatooine",
    vehiclesDetails: [
      {
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom Corporation",
        cost_in_credits: "unknown",
      },
      {
        name: "Imperial Speeder Bike",
        model: "74-Z speeder bike",
        manufacturer: "Aratech Repulsor Company",
        cost_in_credits: "8000",
      },
    ],
  };

  const mockPersonWithoutVehicles = {
    ...mockPersonWithVehicles,
    vehiclesDetails: [],
  };

  it("muestra correctamente la información básica de la persona", () => {
    render(<VehicleCard people={mockPersonWithVehicles} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText(/mass:/i)).toBeInTheDocument();
    expect(screen.getByText(/hair color:/i)).toBeInTheDocument();
    expect(screen.getByText(/skin color:/i)).toBeInTheDocument();
    expect(screen.getByText(/eye color:/i)).toBeInTheDocument();
    expect(screen.getByText(/birth year:/i)).toBeInTheDocument();
    expect(screen.getByText(/gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/homeworld:/i)).toBeInTheDocument();
  });

  it("muestra la lista de vehículos cuando está disponible", () => {
    render(<VehicleCard people={mockPersonWithVehicles} />);

    expect(screen.getByText("🚗 Vehículos")).toBeInTheDocument();
    expect(screen.getByText(/Snowspeeder/i)).toBeInTheDocument();
    expect(screen.getByText(/Imperial Speeder Bike/i)).toBeInTheDocument();
    expect(screen.getByText(/Incom Corporation/i)).toBeInTheDocument();
    expect(screen.getByText(/Aratech Repulsor Company/i)).toBeInTheDocument();
  });

  it("muestra un mensaje cuando la persona no tiene vehículos", () => {
    render(<VehicleCard people={mockPersonWithoutVehicles} />);
    expect(screen.getByText("No tiene vehículos registrados")).toBeInTheDocument();
  });
});