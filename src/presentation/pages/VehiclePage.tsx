import { useEffect, useState } from "react";
import { SwapiPeopleRepository } from "../../infrastructure/repositories/SwapiPeopleRepository";
import { SwapiVehicleRepository } from "../../infrastructure/repositories/SwapiVehicleRepository";
import { GetVehicle } from "../../application/usecases/GetVehicle";
import { VehicleCard } from "../components/VehicleCard";

const getPersonWithVehicles = new GetVehicle(
  new SwapiPeopleRepository(),
  new SwapiVehicleRepository()
);

export const VehiclePage = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonWithVehicles.execute(id).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Api Root</h1>

      <input
        type="number"
        min={1}
        className="border p-2 rounded"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="ID del personaje"
      />

      {loading && <p>Cargando...</p>}
      {data && <VehicleCard people={data} />}
    </div>
  );
};
