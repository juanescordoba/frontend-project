/**
 * @jest-environment jsdom
 */
import axios from "axios";
import { SwapiPeopleRepository } from "../../src/infrastructure/repositories/SwapiPeopleRepository";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SwapiPeopleRepository", () => {
  let repo: SwapiPeopleRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new SwapiPeopleRepository();
  });

  it("obtiene una persona por ID y asigna las caracteristicas", async () => {
    // Arrange
    const fakeApiResponse = {
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

    mockedAxios.get.mockResolvedValueOnce({ data: fakeApiResponse });

    const person = await repo.getById(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("https://swapi.dev/api//people/1/");
    expect(person).toEqual({
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
    });
  });

  it("lanza un error cuando axios falla", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(repo.getById(999)).rejects.toThrow("Network error");
  });
});

