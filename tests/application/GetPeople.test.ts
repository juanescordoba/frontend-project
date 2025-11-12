import { SwapiPeopleRepository } from "../../src/infrastructure/repositories/SwapiPeopleRepository";
import { GetPeople } from "../../src/application/usecases/GetPeople";

jest.mock("../../src/infrastructure/repositories/SwapiPeopleRepository");

describe("GetPeople caso de uso", () => {
  it("lanza un error si la persona no existe", async () => {
    const repo = new SwapiPeopleRepository();
    const useCase = new GetPeople(repo);

    await expect(useCase.execute(999)).rejects.toThrow("People not found");
  });
});



