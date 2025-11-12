import axios from "axios";
import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class SwapiVehicleRepository implements VehicleRepository {
  async getByUrls(urls: string[]): Promise<Vehicle[]> {
    if (urls.length === 0) return [];
    const responses = await Promise.all(urls.map((url) => axios.get(url)));
    return responses.map(({ data }) => ({
      name: data.name,
      model: data.model,
      manufacturer: data.manufacturer,
      cost_in_credits: data.cost_in_credits,
    }));
  }
}
