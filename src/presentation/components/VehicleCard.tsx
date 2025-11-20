import React from "react";
export const VehicleCard = ({ people }: { people: any }) => (
    <div className="bg-white rounded-xl shadow-md p-4 w-[400px]">
      <h2 data-testid="people-name" className="text-xl font-bold mb-2">{people.name}</h2>
      <ul className="text-sm space-y-1">
      <li data-testid="people-height"><strong>height:</strong> {people.height} cm</li>
        <li data-testid="people-mass"><strong>mass:</strong> {people.mass} kg</li>
        <li data-testid="people-hair"><strong>hair color:</strong> {people.hair_color}</li>
        <li data-testid="people-skin"><strong>skin color:</strong> {people.skin_color}</li>
        <li data-testid="people-eye"><strong>eye color:</strong> {people.eye_color}</li>
        <li data-testid="people-birth"><strong>birth year:</strong> {people.birth_year}</li>
        <li data-testid="people-gender"><strong>gender:</strong> {people.gender}</li>
        <li data-testid="people-homeworld"><strong>homeworld:</strong> {people.homeworld}</li>
      </ul>
  
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-1">🚗 Vehículos</h3>
        {people.vehiclesDetails.length > 0 ? (
          <ul data-testid="vehicle-list" className="list-disc ml-4">
            {people.vehiclesDetails.map((v: any, i: number) => (
              <li  key={i}>
                <strong>{v.name}</strong> — {v.model} - ({v.manufacturer}) - ({v.cost_in_credits})          
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tiene vehículos registrados</p>
        )}
      </div>
    </div>
  );
  