// rafce
import React, { useState, useContext } from "react";
import { WatchListContext } from "../context/WatchListContext";

const AddCoin = () => {
  const [isActive, setIsActive] = useState(false);
  const { addCoin, resetCoins } = useContext(WatchListContext);

  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "tezos",
    "cardano",
    "dogecoin",
    "monero",
    "bittorrent-2",
  ];

  const handleAddCoin = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  const resetCoinsToDefault = () => {
    resetCoins();
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="dropdown multiple">
        <button
          onClick={() => setIsActive(!isActive)}
          className="btn btn-primary dropdown-toggle"
          type="button"
        >
          Add Coin
        </button>
        <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
          {availableCoins.map((el) => {
            return (
              <a
                href="#"
                onClick={() => handleAddCoin(el)}
                key={el}
                className="dropdown-item"
              >
                {el}
              </a>
            );
          })}
          {/* <select
          className="form-select"
          multiple
          aria-label="multiple select example"
        >
          <option defaultValue>Open this select menu</option>

          {availableCoins.map((el) => {
            return (
              <option
                onClick={() => handleAddCoin(el)}
                key={el}
                value={el}
                onClick={() => handleAddCoin(el)}
              >
                {el}
              </option>
            );
          })}
        </select> */}
        </div>
      </div>
      <div>
        <button onClick={resetCoinsToDefault} className="btn btn-success">
          Reset Coins
        </button>
      </div>
    </div>
  );
};

export default AddCoin;
