import { Chip, Table } from "@mui/material";

export default async function Home() {
  const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todosData = await todos.json();
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <Chip label="Hello World" />
      <pre>{JSON.stringify(todosData, null, 4)}</pre>
    </section>
  );
}
