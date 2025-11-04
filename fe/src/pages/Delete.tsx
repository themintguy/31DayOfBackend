import { useState } from "react";
import { deleteItem } from "../api/items";

export default function Delete() {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    try {
      const res = await deleteItem(id);
      alert(res.data.message);
      setId("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data || "Error deleting item");
    }
  };

  return (
    <div>
      <h2>Delete Item</h2>
      <input
        type="text"
        placeholder="ID of item to delete"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
