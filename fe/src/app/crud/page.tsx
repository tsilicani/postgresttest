"use client";

import { PostgrestClient } from "@supabase/postgrest-js";
import { useEffect } from "react";
const REST_URL = "http://localhost:3001";
const postgrest = new PostgrestClient(REST_URL);
export default function Home() {
  useEffect(() => {
    postgrest
      .from("city")
      .select("*")
      .order("id", { ascending: true })
      .then((res) => console.log({ res }));
  });
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      crud
    </section>
  );
}
