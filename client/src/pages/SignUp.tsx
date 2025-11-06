import { useState } from "react";
import axios from "axios";
import { getSignup } from "../api/moneyAPI";

const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, Setloading] = useState<boolean>(false);
  const [error, Seterror] = useState<string | null>(null);

  const handleSignUp = async () => {
    // For now, just log the input values
    // console.log("Username:", username);
    // console.log("Email:", email);
    // console.log("Password:", password);
    // alert(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);

    Setloading(true);
    Seterror(null);

    try {
      const res = await getSignup(username,email , password);
      console.log(res.data);
    } catch (err: unknown){
      if(axios.isAxiosError(err)){
        console.error("SignUp error",err);
        Seterror(err.response?.data?.msg || "sign up failed");
      }
    }
    finally{
      Setloading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        gap: "10px",
      }}
    >
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp} disabled={loading}>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignUp;
