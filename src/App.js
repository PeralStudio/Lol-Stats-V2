import axios from "axios";
import { useState } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useLocalStorage } from './customHooks/localStorage';
import "./App.css";

import AutoScrollToTop from "./AutoScrollTop/autoScrollTop";

import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import SummonerRank from "./components/SummonerRank";
import SummonerUnrank from "./components/SummonerUnrank";
import Error from "./components/Error";
import History from "./components/History";
import Histories from './components/Histories';
import StatsGraph from "./components/StatsGraph";
import Error404 from "./components/Error404";

require('dotenv').config();

const App = () => {
  const [summData, setSummData] = useState("");
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [historyGames, setHistoryGames] = useState('');

  const [allLoad, setAllLoad] = useState(false);

  const [summonerNameLS, setSummonerNameLS] = useLocalStorage('SummonerSearch', []);

  const getDataPlayer = async (name) => {
    try {
      const res = await axios.get(
        `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.REACT_APP_API_RIOT}`
      );
      setName(name.toLowerCase())
      setSummData(res.data);
      getDataPlayer2(res.data.id);
      setError(false);
      getDataPlayerMacthes(res.data.accountId);
    } catch (error) {
      setError(true);
      setName('');
    }
  };

  const getDataPlayer2 = async (id) => {
    const res = await axios.get(
      `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_RIOT}`
    );
    setData(res.data[0]);
  };

  let maxGames = [0, 1, 2, 3, 4, /* 5, 6, 7, 8, 9 */];
  let allGames = []

  const getDataPlayerMacthes = async (accountId) => {
    const res = await axios.get(
      `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${process.env.REACT_APP_API_RIOT}`
    );
    for (let games of maxGames) {
      allGames.push(`${res.data.matches[games].gameId}`);
      setHistoryGames(allGames);
      setAllLoad(true)
      // getDataPlayerMacth(res.data.matches[0].gameId);
    }
  };

  return (
    <>
      <Router>
        <Navbar
          setSummData={setSummData}
          setData={setData}
          setName={setName}
          setHistoryGames={setHistoryGames}
          setAllLoad={setAllLoad}
          setError={setError}
        />
        <AutoScrollToTop>
          <Switch>
            <Route exact path="/">
              <div className="App">
                <SearchBox
                  data={data}
                  summData={summData}
                  setName={setName}
                  getDataPlayer={getDataPlayer}
                  name={name}
                  summonerNameLS={summonerNameLS}
                  setSummonerNameLS={setSummonerNameLS}
                />
                {error ? (
                  <Error />
                ) : data ? (
                  <>
                    <SummonerRank
                      data={data}
                      summData={summData}
                      name={name}
                      allLoad={allLoad}
                    />
                  </>
                ) : (
                  summData &&
                  <>
                    <SummonerUnrank
                      name={name}
                      summData={summData}
                    />
                  </>
                )}
              </div>
            </Route>
            <Route
              exact path='/graphics/:id'
              component={() =>
                <div className="App">
                  <StatsGraph
                    name={name}
                    getDataPlayer={getDataPlayer}
                    setAllLoad={setAllLoad}
                  />
                </div>} />
            <Route
              exact path='/history/:id'
              component={() =>
                <div className="App">
                  <History
                    name={name}
                    data={data}
                    getDataPlayer={getDataPlayer}
                    setAllLoad={setAllLoad}
                  />
                </div>}
            />
            <Route
              exact path='/histories/:name'
              component={() =>
                <div className="App">
                  <Histories
                    historyGames={historyGames}
                    summData={summData}
                    data={data}
                  />
                </div>}
            />
            <Route exact path="/histories/">
              <Redirect to="/" />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </AutoScrollToTop>
      </Router>
    </>
  );
};

export default App;