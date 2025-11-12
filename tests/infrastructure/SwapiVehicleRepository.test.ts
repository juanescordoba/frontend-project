/**
 * @jest-environment jsdom
 */
import axios from "axios";
import { SwapiVehicleRepository } from "../../src/infrastructure/repositories/SwapiVehicleRepository";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SwapiVehicleRepository", () => {
  let repo: SwapiVehicleRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new SwapiVehicleRepository();
  });

  it("devuelve un arreglo vacío si la lista de URLs está vacía", async () => {
    const result = await repo.getByUrls([]);
    expect(result).toEqual([]);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it("recupera y mapea múltiples vehículos", async () => {
    const fakeUrls = [
      "https://swapi.dev/api/vehicles/14/",
      "https://swapi.dev/api/vehicles/30/",
    ];

    const fakeResponses = [
      {
        data: {
          name: "Snowspeeder",
          model: "t-47 airspeeder",
          manufacturer: "Incom corporation",
          cost_in_credits: "unknown",
        },
      },
      {
        data: {
          name: "Imperial Speeder Bike",
          model: "74-Z Speeder Bike",
          manufacturer: "Aratech Repulsor Company",
          cost_in_credits: "8000",
        },
      },
    ];

    mockedAxios.get
      .mockResolvedValueOnce(fakeResponses[0])
      .mockResolvedValueOnce(fakeResponses[1]);

    const result = await repo.getByUrls(fakeUrls);

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(1, fakeUrls[0]);
    expect(mockedAxios.get).toHaveBeenNthCalledWith(2, fakeUrls[1]);

    expect(result).toEqual([
      {
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom corporation",
        cost_in_credits: "unknown",
      },
      {
        name: "Imperial Speeder Bike",
        model: "74-Z Speeder Bike",
        manufacturer: "Aratech Repulsor Company",
        cost_in_credits: "8000",
      },
    ]);
  });

  it("lanza un error si falla alguna solicitud de vehículo", async () => {
    const fakeUrls = ["https://swapi.dev/api/vehicles/99/"];

    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    await expect(repo.getByUrls(fakeUrls)).rejects.toThrow("Network Error");
    expect(mockedAxios.get).toHaveBeenCalledWith("https://swapi.dev/api/vehicles/99/");
  });
});
