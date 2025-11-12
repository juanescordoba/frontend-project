import { useState,useEffect } from "react";
import { GetPeople } from "../../application/usecases/GetPeople";
import { SwapiPeopleRepository } from "../../infrastructure/repositories/SwapiPeopleRepository";
import { PeopleCard } from "../components/PeopleCard";

const getPeople = new GetPeople(new SwapiPeopleRepository());

export const PeoplePage = () => {
    const [people,setPeople] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [id,setId] = useState(1);

    useEffect(()=>{
        setLoading(true);
        getPeople.execute(id).then((res)=> {
            setPeople(res);
            setLoading(false);
        });
    },[id]);
    return(<div className="p-6 flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold">Api Root</h1>
  
        <div className="flex gap-2">
          <input
            type="number"
            className="border p-2 rounded"
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
            min={1}
            placeholder="ID del personaje"
          />
        </div>
  
        {loading && <p>Cargando...</p>}
        {people && <PeopleCard people={people} />}
      </div>
      );
};