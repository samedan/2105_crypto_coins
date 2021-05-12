// rafce
import React, { useContext, useEffect, useState } from "react";
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from "../context/WatchListContext";
import Coin from "./Coin";
import Loading from "./Loading";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(WatchListContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await coinGecko.get("/coins/markets", {
        params: {
          vs_currency: "eur",
          // Puts a comma after each Array member
          ids: watchList.join(","),
        },
      });

      // console.log(response.data);
      setCoins(response.data);
      setIsLoading(false);
    };
    if (watchList.length > 0) {
      fetchData();
    } else {
      setCoins([]);
    }
  }, [watchList]);

  const renderCoins = () => {
    if (isLoading) {
      return <Loading />;
    }
    return (
      <ul className="coin-list list-group mt-2">
        <li className="d-flex justify-content-between align-items-center text-dark">
          <h6 className="">Cryptocurrency</h6>
          <h6>Current Price</h6>
          <h6>24h</h6>
          <h6>7 day evolution</h6>
        </li>
        {coins.map((coin) => {
          return (
            <Coin
              id={coin.id}
              key={coin.id}
              coin={coin}
              deleteCoin={deleteCoin}
            />
          );
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
