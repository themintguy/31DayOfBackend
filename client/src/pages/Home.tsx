import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserUsername } from "../api/moneyAPI";
import axios from "axios";
import { API_URL_AUTH } from "../api/axiosClient";

const Home = () => {
  const [money, setMoney] = useState<number>(0);
  const [username, setUsername] = useState<string>(""); // fetched username
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  

  // Fetch logged-in username from JWT cookie
  const fetchUsername = async () => {
    try {
      const res = await axios.get(`${API_URL_AUTH}/auth/verify`, {
        withCredentials: true,
      });
      setUsername(res.data.id.username); // adjust based on your verify route response
    } catch (err) {
      console.error("Failed to get username", err);
      setError("Unable to get logged-in user");
    }
  };

  // Fetch username on mount
  useEffect(() => {
    fetchUsername();
  }, []);

  // Fetch user money by clicking "Show Money"
  const handleShowMoney = async () => {
    if (!username) return alert("Username not loaded yet");

    setLoading(true);
    setError(null);

    try {
      const res = await getUserUsername(username);
      setMoney(res.data.data.money);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {username && <h2>Welcome, {username}</h2>}
      <h1>Money: {money}</h1>
  
      <button onClick={handleShowMoney} disabled={loading} className="ml-2">
        {loading ? "Loading..." : "Show Money"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Link to={"/sendmoney"}>
        <button>send money to frnd</button>
      </Link>
    </>
  );
};

export default Home;
