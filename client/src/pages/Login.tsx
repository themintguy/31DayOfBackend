import { useState } from "react";
import { getLogin } from "../api/moneyAPI";
import axios  from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // For now, just log the input values
  //   console.log("Username:", username);
  //   console.log("Password:", password);
  //   alert(`Username: ${username}\nPassword: ${password}`);
  // };

  setLoading(true);
  setError(null);

  try {
    const res = await getLogin(username, password);
    console.log(res.data); // remove in production
    alert(`Welcom ${username}`);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "Login failed");
    } else {
      console.error("Unexpected error:", err);
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        gap: "10px",
      }}
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

    <button>
      <Link to={"/signup"}>Signup here</Link>
    </button>
    </div>
  );
};

export default Login;
