import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { validarElo2 } from '../functions/ValidarElo';

import TableHistories from './TableHistories';

const Histories = ({ historyGames, summData, data }) => {

    const { name } = useParams();

    const [gameOne, setGameOne] = useState();
    const [gameTwo, setGameTwo] = useState();
    const [gameThree, setGameThree] = useState();
    const [gameFour, setGameFour] = useState();
    const [gameFive, setGameFive] = useState();

    if (historyGames === "") window.location.href = "/";

    useEffect(async () => {

        try {
            const res0 = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[0]}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            const res1 = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[1]}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            const res2 = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[2]}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            const res3 = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[3]}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            const res4 = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_${historyGames[4]}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            setGameOne(res0.data.info)
            setGameTwo(res1.data.info)
            setGameThree(res2.data.info)
            setGameFour(res3.data.info)
            setGameFive(res4.data.info)
        } catch (error) {
            window.location.href = "/";
        }
    }, []);

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
            <h6 style={{ marginTop: '.8rem' }}>Partidas Recientes (Últimas 5 jugadas)</h6>
            <TableHistories
                gameOne={gameOne}
                gameTwo={gameTwo}
                gameThree={gameThree}
                gameFour={gameFour}
                gameFive={gameFive}
                name={name}
            />
        </>
    )
}

export default Histories