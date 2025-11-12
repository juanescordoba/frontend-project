import { PeopleRepository } from '../../domain/repositories/PeopleRepository';

export class GetPeople {
  constructor(private peopleRepo: PeopleRepository) {}

  async execute(id: number) {
    const people = this.peopleRepo.getById(id);
    if (!people) {
      throw new Error("People not found");
    }
    return people;
  }
}
