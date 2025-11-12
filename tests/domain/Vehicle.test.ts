import { Vehicle } from "../../src/domain/entities/Vehicle";

describe("entidad Vehicle", () => {
  it("debería crear un objeto de vehículo válido", () => {
    const vehicle: Vehicle = {
      name: "X-wing",
      model: "T-65 X-wing",
      manufacturer: "Incom Corporation",
      cost_in_credits: "149999",
    };

    expect(vehicle.name).toBe("X-wing");
    expect(vehicle.manufacturer).toBe("Incom Corporation");
  });
});
