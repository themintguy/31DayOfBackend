import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [money, setMoney] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  const handleMoneyChange = () => {
    const numericValue = Number(inputValue);

    if (numericValue > 0 && !isNaN(numericValue)) {
      setMoney(numericValue);
      setInputValue(""); // optional: clear input after updating
    } else {
      alert("Please enter a valid positive number");
    }
  };

  return (
    <>
      <h1>Money: {money}</h1>
      <input
        type="number"
        placeholder="Enter money"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleMoneyChange}>Update Money</button>


      <Link to={"/sendmoney"}>
      <button>
        send money to frnd
      </button>
      </Link>
    </>
  );
};

export default Home;
