// rafce
import React from "react";
import CoinDetailPage from "./pages/CoinDetailPage";
import CoinSummaryPage from "./pages/CoinSummaryPage";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";
import { WatchListContextProvider } from "./context/WatchListContext";

const App = () => {
  return (
    <div className="container">
      <WatchListContextProvider>
        <Router>
          <Header />
          <Route exact path="/" component={CoinSummaryPage} />
          <Route exact path="/coins/:id" component={CoinDetailPage} />
        </Router>
      </WatchListContextProvider>
    </div>
  );
};

export default App;
