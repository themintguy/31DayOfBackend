// frontend/src/components/TransferMoney.tsx
import { useState } from "react";
import { transferMoney } from "../api/moneyAPI" // ✅ import helper

const TransferMoney = () => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!receiverEmail || !amount) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await transferMoney(receiverEmail, Number(amount));
      setMessage(response.data.message);
      setReceiverEmail("");
      setAmount("");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}
    >
      <h2>💸 Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Receiver Email:</label>
          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Transfer
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TransferMoney;
