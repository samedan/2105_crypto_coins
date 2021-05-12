import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SmallHistoryChart from "./SmallHistoryChart";
import coinGecko from "../apis/coinGecko";

const Coin = ({ coin, deleteCoin, id }) => {
  console.log(id);
  const uppercaseCoinName = (nameCoin) => {
    const nameCapitalized =
      nameCoin.charAt(0).toUpperCase() + nameCoin.slice(1);
    return nameCapitalized;
  };

  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formatData = (data) => {
    // {  {}, {}, {} } -> {[], [] []}
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2), // toFixed cuts to 2 decimals
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [week] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "eur",
            days: "7",
          },
        }),
      ]);

      console.log(week);
      setCoinData({
        week: formatData(week.data.prices),
      });

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Link to={`/coins/${coin.id}`} className="text-decoration-non my-1 coin">
      <li className="coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark">
        <span className="text-decoration-none">
          <img src={coin.image} alt={coin.id} className="coinlist-image" />
          <br />
          <span>{uppercaseCoinName(coin.id)}</span>
        </span>
        <span className="text-decoration-none">{coin.current_price}</span>

        <span
          className={
            coin.price_change_percentage_24h < 0
              ? "text-decoration-none text-danger mr-2"
              : "text-decoration-none text-success mr-2"
          }
        >
          {coin.price_change_percentage_24h < 0 ? (
            <i className="fas fa-sort-down align-middle mr-1"></i>
          ) : (
            <i className="fas fa-sort-up align-middle mr-1"></i>
          )}

          {coin.price_change_percentage_24h}
        </span>
        <span>
          <SmallHistoryChart data={coinData} />
        </span>
        <i
          onClick={(e) => {
            e.preventDefault();
            deleteCoin(coin.id);
          }}
          className="delete-icon far fa-times-circle text-danger"
        ></i>
      </li>
    </Link>
  );
};

export default Coin;
