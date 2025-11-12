import { PeopleRepository } from "../../domain/repositories/PeopleRepository";
import { VehicleRepository } from "../../domain/repositories/VehicleRepository";

export class GetVehicle {
  constructor(
    private peopleRepo: PeopleRepository,
    private vehicleRepo: VehicleRepository
  ) {}

  async execute(id: number) {
    const people = await this.peopleRepo.getById(id);
    const vehicles = await this.vehicleRepo.getByUrls(people.vehicles);

    return {
      ...people,
      vehiclesDetails: vehicles,
    };
  }
}
