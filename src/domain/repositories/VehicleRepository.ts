import { Vehicle } from "../entities/Vehicle";

export interface VehicleRepository {
  getByUrls(urls: string[]): Promise<Vehicle[]>;
}
