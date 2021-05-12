import React, { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  let localSavedData = localStorage.getItem("watchList");
  const [watchList, setWatchList] = useState(
    localSavedData !== null
      ? localSavedData.split(",")
      : // localStorage.getItem("watchList").split(",") ||
        ["bitcoin", "ethereum", "ripple", "dogecoin", "monero"]
  );

  useEffect(() => {
    if (localSavedData !== null) {
      localStorage.setItem("watchList", localSavedData.split(","));
    }
    localStorage.setItem("watchList", watchList);
    console.log(localStorage.getItem("watchList"));
  }, [watchList]);

  const addCoin = (coin) => {
    // [coin1, coin2,...] already has the coin, -1 is the index of the new coin
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
    }
  };
  const resetCoins = () => {
    setWatchList(["bitcoin", "ethereum", "ripple", "dogecoin", "monero"]);
  };

  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, deleteCoin, addCoin, resetCoins }}
    >
      {props.children}
    </WatchListContext.Provider>
  );
};
