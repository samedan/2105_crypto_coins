import React from "react";

const CoinData = ({ data }) => {
  console.log(data);
  const renderData = () => {
    if (data) {
      return (
        <div className="bg-white mt-3 p-2 rounded border row">
          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">Market Cap</span>
              <span className="">{data.market_cap}</span>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-muted coin-data-category">
                  Total supply
                </span>
                <span>{data.total_supply}</span>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">Volume(24h)</span>
              <span className="">{data.total_volume}</span>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-muted coin-data-category">High 24h</span>
                <span>{data.high_24h}</span>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="d-flex flex-column">
              <span className="text-muted coin-data-category">
                Circulation Supply
              </span>
              <span className="">{data.circulating_supply}</span>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-muted coin-data-category">Low 24h</span>
                <span>{data.low_24h}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinData;
