import React from "react";
import { People } from '../../domain/entities/People'

export const PeopleCard: React.FC<{ people: People }> = ({ people }) =>  {
  return(
    <div className="border p-4 rounded-xl shadow-md bg-white w-80">
      <h2 data-testid="people-name" className="text-xl font-bold mb-2">{people.name}</h2>
      <ul className="text-sm space-y-1">
      <li data-testid="people-height"><strong>height:</strong> {people.height} cm</li>
        <li data-testid="people-mass"><strong>mass:</strong> {people.mass} kg</li>
        <li data-testid="people-hair"><strong>hair color:</strong> {people.hair_color}</li>
        <li data-testid="people-skin"><strong>skin color:</strong> {people.skin_color}</li>
        <li data-testid="people-eye"><strong>eye color:</strong> {people.eye_color}</li>
        <li data-testid="people-birth"><strong>birth year:</strong> {people.birth_year}</li>
        <li data-testid="people-gender"><strong>gender:</strong> {people.gender}</li>
        <li data-testid="people-homework"><strong>homeword:</strong> {people.homeworld}</li>
      </ul>
    </div>
  );
};

