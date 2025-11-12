import { GetVehicle } from "../../src/application/usecases/GetVehicle";
import { PeopleRepository } from "../../src/domain/repositories/PeopleRepository";
import { VehicleRepository } from "../../src/domain/repositories/VehicleRepository";

describe("GetVehicle caso de uso", () => {
  it("debería obtener los detalles de una persona y sus vehículos", async () => {
    // 🔹 1. Mock de datos
    const mockPerson = {
      id: 1,
      name: "Luke Skywalker",
      vehicles: ["https://swapi.dev/api/vehicles/14/"],
    };

    const mockVehicles = [
      {
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom corporation",
        cost_in_credits: "unknown",
      },
    ];

    // 🔹 2. Mocks de repositorios
    const mockPeopleRepo: PeopleRepository = {
      getById: jest.fn().mockResolvedValue(mockPerson as any),
    };

    const mockVehicleRepo: VehicleRepository = {
      getByUrls: jest.fn().mockResolvedValue(mockVehicles),
    };

    // 🔹 3. Instancia del caso de uso
    const useCase = new GetVehicle(mockPeopleRepo, mockVehicleRepo);

    // 🔹 4. Ejecución
    const result = await useCase.execute(1);

    // 🔹 5. Verificaciones
    expect(mockPeopleRepo.getById).toHaveBeenCalledWith(1);
    expect(mockVehicleRepo.getByUrls).toHaveBeenCalledWith(mockPerson.vehicles);

    expect(result).toEqual({
      ...mockPerson,
      vehiclesDetails: mockVehicles,
    });
  });

  it("debería atender a las personas sin vehículos", async () => {
    const mockPerson = { id: 2, name: "Leia Organa", vehicles: [] };

    const mockPeopleRepo: PeopleRepository = {
      getById: jest.fn().mockResolvedValue(mockPerson as any),
    };

    const mockVehicleRepo: VehicleRepository = {
      getByUrls: jest.fn().mockResolvedValue([]),
    };

    const useCase = new GetVehicle(mockPeopleRepo, mockVehicleRepo);
    const result = await useCase.execute(2);

    expect(result.vehiclesDetails).toEqual([]);
    expect(result.name).toBe("Leia Organa");
  });
});



