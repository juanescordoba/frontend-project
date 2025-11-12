import { VehicleRepository } from "../../src/domain/repositories/VehicleRepository";
import { Vehicle } from "../../src/domain/entities/Vehicle";

export class MockVehicleRepository implements VehicleRepository {
  async getByUrls(urls: string[]): Promise<Vehicle[]> {
    return urls.map((url, index) => ({
      name: `Vehicle ${index + 1}`,
      model: `Model ${index + 1}`,
      manufacturer: "Corellia Engineering",
      cost_in_credits: "15000",
    }));
  }
}

export const SwapiVehicleRepositoryMock = {
    getByUrls: jest.fn().mockResolvedValue([
      { name: "Speeder", model: "X-34", manufacturer: "SoroSuub", cost_in_credits: "10500" },
    ]),
  };
  
