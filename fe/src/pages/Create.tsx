
import { useState } from "react";
import { createItem } from "../api/items";
import { AxiosError } from "axios";

export default function Create() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await createItem({ id, name });
    alert(res.data.message);
    setId("");
    setName("");
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      alert(err.response?.data || "Error creating item");
    } else if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Unknown error occurred");
    }
  }
};


  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
