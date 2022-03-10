import axios from "axios";
import { useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { useLocalStorage } from "./customHooks/localStorage";
import "./App.css";

import AutoScrollToTop from "./AutoScrollTop/autoScrollTop";

import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import SummonerRank from "./components/SummonerRank";
import SummonerUnrank from "./components/SummonerUnrank";
import Error from "./components/Error";
import History from "./components/History";
import Histories from "./components/Histories";
import StatsGraph from "./components/StatsGraph";
import Error404 from "./components/Error404";
import LiveGame from "./components/LiveGame";

require("dotenv").config();

const App = () => {
    const [summData, setSummData] = useState("");
    const [data, setData] = useState("");
    const [dataFlex, setDataFlex] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [historyGames, setHistoryGames] = useState("");
    const [allLoad, setAllLoad] = useState(false);
    const [masteryChamps, setMasteryChamps] = useState(null);

    const [dataLive, setDataLive] = useState("");
    const [err, setErr] = useState(false);

    const [summonerNameLS, setSummonerNameLS] = useLocalStorage(
        "SummonerSearch",
        []
    );

    const getDataPlayer = async (name) => {
        try {
            const res = await axios.get(
                `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            setName(name.toLowerCase());
            setSummData(res.data);
            getDataPlayer2(res.data.id);
            getChampsMasteries(res.data.id);
            setError(false);
            getDataPlayerMacthes(res.data.puuid);
        } catch (error) {
            setError(true);
            setName("");
        }
    };

    const getDataPlayer2 = async (id) => {
        const res = await axios.get(
            `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        const foundRankedSolo = res.data.find(
            (element) => element.queueType === "RANKED_SOLO_5x5"
        );
        const foundRankedFlex = res.data.find(
            (element) => element.queueType === "RANKED_FLEX_SR"
        );
        setData(foundRankedSolo);
        setDataFlex(foundRankedFlex);
    };

    const getDataPlayerMacthes = async (puuid) => {
        const res = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=30&api_key=${process.env.REACT_APP_API_RIOT}`
        );
        setHistoryGames(res.data);
        setAllLoad(true);
    };

    const getChampsMasteries = async (id) => {
        const champsMastery = await axios.get(
            `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process.env.REACT_APP_API_RIOT}`
        );
        setMasteryChamps([
            champsMastery.data[1],
            champsMastery.data[0],
            champsMastery.data[2],
        ]);
    };

    useEffect(() => {
        const getDataLive = async (id) => {
            try {
                const res = await axios.get(
                    `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${process.env.REACT_APP_API_RIOT}`
                );
                setDataLive(res.data);
                setErr(false);
            } catch (error) {
                setErr(true);
            }
        };
        summData && getDataLive(summData.id);
    }, [summData]);

    return (
        <>
            <Router>
                <Navbar
                    setSummData={setSummData}
                    setData={setData}
                    setDataFlex={setDataFlex}
                    setName={setName}
                    setHistoryGames={setHistoryGames}
                    setAllLoad={setAllLoad}
                    setError={setError}
                    setDataLive={setDataLive}
                    setErr={setErr}
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
                                ) : data || dataFlex ? (
                                    <>
                                        <SummonerRank
                                            data={data}
                                            dataFlex={dataFlex}
                                            summData={summData}
                                            name={name}
                                            allLoad={allLoad}
                                            err={err}
                                            dataLive={dataLive}
                                            masteryChamps={masteryChamps}
                                        />
                                    </>
                                ) : (
                                    summData && (
                                        <>
                                            <SummonerUnrank
                                                name={name}
                                                summData={summData}
                                                err={err}
                                                dataLive={dataLive}
                                                masteryChamps={masteryChamps}
                                            />
                                        </>
                                    )
                                )}
                            </div>
                        </Route>
                        <Route
                            exact
                            path="/graphics/:id"
                            component={() => (
                                <div className="App">
                                    <StatsGraph
                                        name={name}
                                        getDataPlayer={getDataPlayer}
                                        setAllLoad={setAllLoad}
                                    />
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/history/:id"
                            component={() => (
                                <div className="App">
                                    <History
                                        name={name}
                                        data={data}
                                        getDataPlayer={getDataPlayer}
                                        setAllLoad={setAllLoad}
                                    />
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/histories/:name"
                            component={() => (
                                <div className="App">
                                    <Histories
                                        historyGames={historyGames}
                                        summData={summData}
                                        data={data}
                                    />
                                </div>
                            )}
                        />
                        <Route
                            exact
                            path="/livegame/:name"
                            component={() => (
                                <div className="App">
                                    <LiveGame
                                        dataLive={dataLive}
                                        getDataPlayer={getDataPlayer}
                                        setAllLoad={setAllLoad}
                                    />
                                </div>
                            )}
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
