import { useState } from "react";
import { updateItem } from "../api/items";

export default function Update() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateItem(id, { name });
      alert(res.data.message);
      setId("");
      setName("");
    } catch (err: any) {
      alert(err.response?.data || "Error updating item");
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID of item to update"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
