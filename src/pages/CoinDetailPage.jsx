// rafce
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinData from "../Components/CoinData";
import HistoryChart from "../Components/HistoryChart";
import coinGecko from "../apis/coinGecko";
import Loading from "../Components/Loading";
import SmallHistoryChart from "../Components/SmallHistoryChart";

const CoinDetailPage = () => {
  const { id } = useParams();
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
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "eur",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "eur",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "eur",
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets", {
          params: {
            vs_currency: "eur",
            // Puts a comma after each Array member
            ids: id,
          },
        }),
      ]);

      // console.log(results.data);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      console.log(detail);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const renderData = () => {
    if (isLoading) {
      return (
        <div className="text-warning">
          <Loading />
        </div>
      );
    } else
      return (
        <div className="coinlist">
          <HistoryChart data={coinData} />
          {/* <SmallHistoryChart data={coinData} /> */}
          <CoinData data={coinData.detail} />
        </div>
      );
  };
  return <div>{renderData()}</div>;
};

export default CoinDetailPage;
