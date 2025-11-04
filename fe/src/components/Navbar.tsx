import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "green",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
      <Link to="/read">read</Link>
      <Link to="/update">update</Link>
      <Link to="/delete">delete</Link>
    </nav>
  );
}
