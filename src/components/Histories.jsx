import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { validarElo2 } from "../functions/ValidarElo";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import TableHistories from "./TableHistories";
// import ArregloTableIntento from './TableHistories';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { checkLvl } from "../functions/checkLevelBorder";

const Histories = ({ historyGames, summData, data }) => {
    const { name } = useParams();
    const [gamesArray, setGamesArray] = useState([]);
    const [version, setVersion] = useState("");

    if (historyGames === "") window.location.href = "/";

    useEffect(() => {
        const versionDataDdragon = async () => {
            try {
                const res = await axios.get(
                    `https://ddragon.leagueoflegends.com/api/versions.json`
                );
                setVersion(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        versionDataDdragon();
    }, []);

    useEffect(async () => {
        let res = [];
        let i = 0;

        for (let gameId of historyGames) {
            res[i] = await axios.get(
                `https://europe.api.riotgames.com/lol/match/v5/matches/${gameId}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            setGamesArray((gamesArray) => [...gamesArray, res[i].data.info]);
            i++;
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
                        <FontAwesomeIcon icon={faChevronLeft} /> Perfil
                    </button>
                </Link>
            </div>
            {gamesArray ? (
                <>
                    <h3
                        style={{
                            marginTop: "1rem",
                            textTransform: "capitalize",
                        }}
                    >
                        <img
                            src={checkLvl(summData.summonerLevel)}
                            alt="border-level"
                            className="border-level"
                            style={{
                                position: "absolute",
                                width: "4.8rem",
                                height: "4.8rem",
                                margin: "auto",
                                marginTop: "-12px",
                                zIndex: 1,
                            }}
                            data-tip={
                                summData && `Nivel ${summData.summonerLevel}`
                            }
                        />
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summData.profileIconId}.png`}
                            className="card-img-top"
                            alt="icon-summoner"
                            style={{
                                width: "4rem",
                                zoom: "0.8",
                                margin: "auto",
                                marginRight: "2rem",
                                marginBottom: "1rem",
                                borderRadius: "50%",
                                marginLeft: "16px",
                            }}
                        />
                        {name}
                    </h3>
                    {gamesArray.length >= 10 && (
                        <h6 style={{ marginTop: ".8rem" }}>
                            Partidas Recientes (Últimas {gamesArray.length}{" "}
                            jugadas)
                        </h6>
                    )}
                    {/* <TableHistories
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
                    /> */}
                    <TableHistories name={name} gamesArray={gamesArray} />
                </>
            ) : (
                <Loader
                    type="TailSpin"
                    color="#00c0b1"
                    height={100}
                    width={100}
                    style={{ marginTop: "100px" }}
                />
            )}
        </>
    );
};

export default Histories;
