import { People } from '../entities/People';

export interface PeopleRepository {
  getById(id: number): Promise<People>;
}
