import { People } from "../../src/domain/entities/People";
import { PeopleRepository } from "../../src/domain/repositories/PeopleRepository";

export class SwapiPeopleRepository implements PeopleRepository {
  async getById(id: number): Promise<People> {
    // Simula respuesta de la API de SWAPI
    if (id === 1) {
      return {
        id: 1,
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1/",
        vehicles: ["https://swapi.dev/api/vehicles/14/"],
      };
    }

    // Simula error o caso no encontrado
    throw new Error("People not found");
  }
}
