import axios from 'axios';
import { PeopleRepository } from '../../domain/repositories/PeopleRepository';
import { People } from '../../domain/entities/People';

export class SwapiPeopleRepository implements PeopleRepository {
  private baseUrl = 'https://swapi.dev/api/';

  async getById(id: number): Promise<People> {
    const { data } = await axios.get(`${this.baseUrl}/people/${id}/`);
    return {
      id,
      name:data.name,
      height:data.height,
      mass:data.mass,
      hair_color:data.hair_color,
      skin_color:data.skin_color,
      eye_color:data.eye_color,
      birth_year:data.birth_year,
      gender:data.gender,
      homeworld:data.homeworld,
      vehicles:data.vehicles,
    };
  }
}
