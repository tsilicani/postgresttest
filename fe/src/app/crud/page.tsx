"use client";

import { PostgrestClient } from "@supabase/postgrest-js";
import { Database } from "@/lib/__generated__/db-types";
import { useQuery } from "@tanstack/react-query";
export type { Database } from "@/lib/__generated__/db-types";

export type Client = PostgrestClient<Database>;
const REST_URL = "http://localhost:3001";
const postgrest = new PostgrestClient<Database>(REST_URL);

async function fetchCountries() {
  return await postgrest
    .from("country")
    .select("*")
    .order("name", { ascending: true });
}

async function fetchPets() {
  return await postgrest
    .from("pets")
    .select("*")
    .gte("age", 5)
    .order("name", { ascending: true });
}

export default function Home() {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const {
    data: pets,
    isLoading: isLoadingPets,
    error: errorPets,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-lg font-bold">List of Countries</h1>
      <table className="mt-8 border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-4">Country</th>
            <th className="border border-slate-600 p-4">Capital</th>
            <th className="border border-slate-600 p-4">Continent</th>
            <th className="border border-slate-600 p-4">Population</th>
          </tr>
        </thead>
        <tbody>
          {countries?.data?.map((country, idx) => (
            <tr key={idx}>
              <td className="border border-slate-700 p-4">{country.name}</td>
              <td className="border border-slate-700 p-4">{country.capital}</td>
              <td className="border border-slate-700 p-4">
                {country.continent}
              </td>
              <td className="border border-slate-700 p-4">
                {country.population}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-lg font-bold">List of Pets</h1>
      <table className="mt-8 border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-4">Name</th>
            <th className="border border-slate-600 p-4">Breed</th>
            <th className="border border-slate-600 p-4">Age</th>
            <th className="border border-slate-600 p-4">Owner</th>
          </tr>
        </thead>
        <tbody>
          {pets?.data?.map((pet, idx) => (
            <tr key={idx}>
              <td className="border border-slate-700 p-4">{pet.name}</td>
              <td className="border border-slate-700 p-4">{pet.breed}</td>
              <td className="border border-slate-700 p-4">{pet.age}</td>
              <td className="border border-slate-700 p-4">{pet.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
