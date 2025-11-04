import { useEffect, useState } from "react";
import { getItems } from "../api/items";

export default function Read() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>All Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id}: {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
