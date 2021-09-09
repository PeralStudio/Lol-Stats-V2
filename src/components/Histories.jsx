import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { validarElo2 } from '../functions/ValidarElo';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import TableHistories from './TableHistories';

const Histories = ({ historyGames, summData, data }) => {

    const { name } = useParams();

    const [gameOne, setGameOne] = useState();
    const [gameTwo, setGameTwo] = useState();
    const [gameThree, setGameThree] = useState();
    const [gameFour, setGameFour] = useState();
    const [gameFive, setGameFive] = useState();

    // if (historyGames === "") window.location.href = "/";

    useEffect(async () => {
        const res0 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[0]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameOne(res0.data.info);
    }, [historyGames]);

    useEffect(async () => {
        const res1 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[1]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameTwo(res1.data.info);
    }, [historyGames]);

    useEffect(async () => {
        const res2 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[2]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameThree(res2.data.info);
    }, [historyGames]);

    useEffect(async () => {
        const res3 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[3]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameFour(res3.data.info);
    }, [historyGames]);

    useEffect(async () => {
        const res4 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[4]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameFive(res4.data.info)
    }, [historyGames]);

    const allGamesArray = [];

    gameOne != undefined && allGamesArray.push(gameOne);
    gameTwo != undefined && allGamesArray.push(gameTwo);
    gameThree != undefined && allGamesArray.push(gameThree);
    gameFour != undefined && allGamesArray.push(gameFour);
    gameFive != undefined && allGamesArray.push(gameFive);

    return (
        <>
            <div>
                <Link to="/">
                    <button
                        type="button"
                        className="btn btn-outline-info button-back"
                    >
                        Volver
                    </button>
                </Link>
                {/* <Link to={`/graphics`}><button style={{ marginLeft: '10px' }} type="button" className="btn btn-outline-info button-back">Gráfica</button></Link> */}
            </div>
            {gameFive ?
                <>
                    <h2>Historial</h2>
                    <h3
                        style={{
                            marginTop: '1rem',
                            textTransform: 'capitalize'
                        }}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/11.17.1/img/profileicon/${summData.profileIconId}.png`}
                            alt="Icon"
                            className={data ? validarElo2(data.tier) : 'gold'}
                            style={{
                                width: "3rem",
                                marginRight: '.4rem',
                                borderRadius: "50%",
                            }}
                        />
                        {name}

                    </h3>
                    <h6 style={{ marginTop: '.8rem' }}>Partidas Recientes (Últimas {allGamesArray.length} jugadas)</h6>
                    <TableHistories
                        gameOne={gameOne}
                        gameTwo={gameTwo}
                        gameThree={gameThree}
                        gameFour={gameFour}
                        gameFive={gameFive}
                        name={name}
                    />
                </>
                :
                <Loader
                    type="TailSpin"
                    color="#00c0b1"
                    height={100}
                    width={100}
                    style={{ marginTop: '100px' }}
                />
            }
        </>
    )
}

export default Histories