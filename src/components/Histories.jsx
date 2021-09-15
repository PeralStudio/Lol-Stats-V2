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

    const [gameSix, setGameSix] = useState();
    const [gameSeven, setGameSeven] = useState();
    const [gameEight, setGameEight] = useState();
    const [gameNine, setGameNine] = useState();
    const [gameTen, setGameTen] = useState();

    if (historyGames === "") window.location.href = "/";

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






    useEffect(async () => {
        const res5 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[5]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameSix(res5.data.info)
    }, [historyGames]);

    useEffect(async () => {
        const res6 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[6]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameSeven(res6.data.info)
    }, [historyGames]);

    useEffect(async () => {
        const res7 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[7]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameEight(res7.data.info)
    }, [historyGames]);

    useEffect(async () => {
        const res8 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[8]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameNine(res8.data.info)
    }, [historyGames]);

    useEffect(async () => {
        const res9 = await axios.get(
            `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[9]}?api_key=${process.env.REACT_APP_API_RIOT}`
        );

        setGameTen(res9.data.info)
    }, [historyGames]);

    const allGamesArray = [];

    gameOne != undefined && allGamesArray.push(gameOne);
    gameTwo != undefined && allGamesArray.push(gameTwo);
    gameThree != undefined && allGamesArray.push(gameThree);
    gameFour != undefined && allGamesArray.push(gameFour);
    gameFive != undefined && allGamesArray.push(gameFive);

    gameSix != undefined && allGamesArray.push(gameSix);
    gameSeven != undefined && allGamesArray.push(gameSeven);
    gameEight != undefined && allGamesArray.push(gameEight);
    gameNine != undefined && allGamesArray.push(gameNine);
    gameTen != undefined && allGamesArray.push(gameTen);

    return (
        <>
            <div>
                <Link to="/">
                    <button
                        type="button"
                        className="btn btn-outline-info button-back"
                    >
                        Perfil
                    </button>
                </Link>
                {/* <Link to={`/graphics`}><button style={{ marginLeft: '10px' }} type="button" className="btn btn-outline-info button-back">Gráfica</button></Link> */}
            </div>
            {gameFive ?
                <>
                    <h1 style={{ fontSize: '2.2rem' }}>Historial</h1>
                    <h3
                        style={{
                            marginTop: '1rem',
                            textTransform: 'capitalize',
                        }}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/11.17.1/img/profileicon/${summData.profileIconId}.png`}
                            alt="Icon"
                            className={data ? validarElo2(data.tier) : 'gold'}
                            style={{
                                width: "3rem",
                                marginRight: '.4rem',
                                marginBottom: '.3rem',
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
                        gameSix={gameSix}
                        gameSeven={gameSeven}
                        gameEight={gameEight}
                        gameNine={gameNine}
                        gameTen={gameTen}
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