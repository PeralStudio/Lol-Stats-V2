import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { Link, useHistory, useParams } from "react-router-dom";
import dayjs from "dayjs";

import { champsId } from "../dataDragon/champsId";
import { queueId } from "../dataDragon/queueid";

import { PNoMargin } from "../UI/TableHistoriesUi";
import vsImage from "../assets/img/vs.png";
import ReactTooltip from "react-tooltip";
import { validarElo2 } from "../functions/ValidarElo";
import { summonerSpells } from "../dataDragon/generalData";
import { checkLvl, checkMiniCrest } from "../functions/checkLevelBorder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const LiveGame = ({ dataLive, getDataPlayer }) => {
    const [dataRankSummoners, setDataRankSummoners] = useState([]);
    const [dataRankFlex, setDataRankFlex] = useState([]);
    const [dataUnrankSummoners, setDataUnrankSummoners] = useState([]);
    const [version, setVersion] = useState("");

    const historyUrl = useHistory();
    const { name } = useParams();

    if (dataLive === "") window.location.href = "/";

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

    dayjs.updateLocale("en", {
        relativeTime: {
            future: " %s",
            past: "%s",
            s: "hace unos segundos",
            m: "hace un minuto",
            mm: "hace %d minutos",
            h: "hace una hora",
            hh: "hace %d horas",
            d: "hace un día",
            dd: "hace %d días",
            M: "hace un mes",
            MM: "hace %d meses",
            y: "hace un año",
            yy: "hace %d años",
        },
    });

    let summonerIds = [];
    let dataSumm = [];
    // let dataRankSummoners = [];
    let dataSummoners = [];
    let foundChampId = [];

    for (let participant of dataLive.participants) {
        summonerIds.push(participant.summonerId);
        dataSumm.push(participant);
    }

    const summLevel = dataUnrankSummoners.map(
        (element) => element.summonerLevel
    );
    const found = queueId.find(
        (element) => element.queueId === dataLive.gameQueueConfigId
    );

    const found2 = dataLive.gameType === "CUSTOM_GAME" ? "Personalizada" : "";
    const gameStart =
        dayjs(dataLive.gameStartTime).fromNow() == "hace 52 años"
            ? "hace 0 minutos"
            : dayjs(dataLive.gameStartTime).fromNow();

    useEffect(async () => {
        let res = [];
        let res2 = [];
        let i = 0;

        for (let summid of summonerIds) {
            res[i] = await axios.get(
                `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summid}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            const foundRankedSolo = res[i].data.find(
                (element) => element.queueType === "RANKED_SOLO_5x5"
            );
            const foundRankedFlex = res[i].data.find(
                (element) => element.queueType === "RANKED_FLEX_SR"
            );
            setDataRankSummoners((dataRankSummoners) => [
                ...dataRankSummoners,
                foundRankedSolo,
            ]);
            setDataRankFlex((dataRankFlex) => [
                ...dataRankFlex,
                foundRankedFlex,
            ]);
            i++;

            res2[i] = await axios.get(
                `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${summid}?api_key=${process.env.REACT_APP_API_RIOT}`
            );
            setDataUnrankSummoners((dataUnrankSummoners) => [
                ...dataUnrankSummoners,
                res2[i].data,
            ]);
            i++;
        }
    }, []);

    const yourStats = (index) =>
        name === dataLive.participants[index].summonerName.toLowerCase()
            ? " me-loading"
            : "";

    dataSumm.map((data, index) =>
        foundChampId.push(
            champsId.find((element) => element.champId === data.championId)
        )
    );

    return (
        <>
            {dataRankSummoners.length > 9 ? (
                <div style={{ paddingBottom: ".5rem" }}>
                    <Link to={`/`}>
                        <button
                            type="button"
                            className="btn btn-outline-info button-back"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} /> Volver
                        </button>
                    </Link>
                    <h3>{found ? found.description : found2}</h3>
                    {found && <h6>{found?.map}</h6>}
                    <p>Empezó {gameStart}</p>
                    <div className="livegame-row">
                        {dataSumm.map((data, index) => (
                            <>
                                {index <= 4 && (
                                    <div
                                        key={`${index}a`}
                                        onClick={() => {
                                            historyUrl.push(`/`);
                                            getDataPlayer(data.summonerName);
                                        }}
                                        style={{
                                            margin: "5px",
                                            cursor: "pointer",
                                        }}
                                        className={
                                            dataRankSummoners[index] &&
                                            dataRankSummoners != undefined
                                                ? validarElo2(
                                                      dataRankSummoners[index]
                                                          .tier
                                                  ) +
                                                  "-loading" +
                                                  yourStats(index)
                                                : "unranked1" + yourStats(index)
                                        }
                                    >
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${foundChampId[index]?.name}_0.jpg`}
                                            // style={{ width: "8rem" }}
                                            className="img-loading"
                                            data-tip={foundChampId[index]?.name}
                                        />
                                        <div style={{ marginRight: "15px" }}>
                                            {/* <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.profileIconId}.png`}
                                                style={{
                                                    width: "3.5rem",
                                                    borderRadius: "50%",
                                                    marginTop: "-105px",
                                                }}
                                                className="gold"
                                            /> */}
                                            <img
                                                src={checkLvl(summLevel[index])}
                                                alt="borderLvl"
                                                className="opgg"
                                                style={{
                                                    position: "absolute",
                                                    width: "4.8rem",
                                                    height: "4.8rem",
                                                    margin: "auto",
                                                    marginTop: "-90px",
                                                    zIndex: 1,
                                                }}
                                                data-tip={`Nivel ${summLevel[index]}`}
                                            />
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.profileIconId}.png`}
                                                className="card-img-top"
                                                alt="..."
                                                style={{
                                                    width: "4rem",
                                                    zoom: "0.7",
                                                    margin: "auto",
                                                    borderRadius: "50%",
                                                    marginLeft: "23px",
                                                    marginTop: "-190px",
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                marginTop: "-15px",
                                            }}
                                        >
                                            <div>
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${
                                                        summonerSpells[
                                                            data.spell1Id
                                                        ]
                                                    }.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{
                                                        marginRight: "5px",
                                                        width: "1.5rem",
                                                    }}
                                                    data-tip={
                                                        summonerSpells[
                                                            data.spell1Id
                                                        ]
                                                    }
                                                />
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${
                                                        summonerSpells[
                                                            data.spell2Id
                                                        ]
                                                    }.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{ width: "1.5rem" }}
                                                    data-tip={
                                                        summonerSpells[
                                                            data.spell2Id
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                marginBottom: "10px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <span style={{ fontSize: "15px" }}>
                                                {data.summonerName}
                                            </span>
                                            <PNoMargin
                                                style={{ fontSize: ".7rem" }}
                                            >
                                                {dataRankSummoners[index] ==
                                                undefined
                                                    ? `Nivel ${summLevel[index]}`
                                                    : `${dataRankSummoners[index].tier} - ${dataRankSummoners[index].rank} (${dataRankSummoners[index].leaguePoints} LP)`}
                                            </PNoMargin>
                                            {dataRankSummoners[index] !==
                                            undefined ? (
                                                <img
                                                    src={checkMiniCrest(
                                                        dataRankSummoners[index]
                                                            .tier
                                                    )}
                                                    alt="rank"
                                                    style={{
                                                        width: "2.5rem",
                                                        marginBottom: "-10px",
                                                    }}
                                                    data-tip={
                                                        dataRankSummoners[index]
                                                            ?.tier &&
                                                        ` ${dataRankSummoners[index]?.tier} ${dataRankSummoners[index]?.rank} - ${dataRankSummoners[index]?.leaguePoints} LP`
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src={checkMiniCrest()}
                                                    alt="rank"
                                                    style={{
                                                        width: "2rem",
                                                        marginBottom: "-10px",
                                                    }}
                                                    data-tip={"UNRANKED"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div>
                        <img src={vsImage} style={{ width: "4rem" }} />
                    </div>
                    <div className="livegame-row">
                        {dataSumm.map((data, index) => (
                            <>
                                {index >= 5 && (
                                    <div
                                        key={`${index}b`}
                                        onClick={() => {
                                            historyUrl.push(`/`);
                                            getDataPlayer(data.summonerName);
                                        }}
                                        style={{
                                            margin: "5px",
                                            cursor: "pointer",
                                        }}
                                        className={
                                            dataRankSummoners[index] &&
                                            dataRankSummoners != undefined
                                                ? validarElo2(
                                                      dataRankSummoners[index]
                                                          .tier
                                                  ) +
                                                  "-loading" +
                                                  yourStats(index)
                                                : "unranked2" + yourStats(index)
                                        }
                                    >
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${foundChampId[index].name}_0.jpg`}
                                            className="img-loading"
                                            data-tip={foundChampId[index]?.name}
                                        />
                                        <div style={{ marginRight: "15px" }}>
                                            {/* <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.profileIconId}.png`}
                                                style={{
                                                    width: "3.5rem",
                                                    borderRadius: "50%",
                                                    marginTop: "-105px",
                                                }}
                                                className="gold"
                                            /> */}
                                            <img
                                                src={checkLvl(summLevel[index])}
                                                alt="borderLvl"
                                                className="opgg"
                                                style={{
                                                    position: "absolute",
                                                    width: "4.8rem",
                                                    height: "4.8rem",
                                                    margin: "auto",
                                                    marginTop: "-90px",
                                                    zIndex: 1,
                                                }}
                                                data-tip={`Nivel ${summLevel[index]}`}
                                            />
                                            <img
                                                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.profileIconId}.png`}
                                                className="card-img-top"
                                                alt="..."
                                                style={{
                                                    width: "4rem",
                                                    zoom: "0.7",
                                                    margin: "auto",
                                                    borderRadius: "50%",
                                                    marginLeft: "23px",
                                                    marginTop: "-190px",
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                marginTop: "-15px",
                                            }}
                                        >
                                            <div>
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${
                                                        summonerSpells[
                                                            data.spell1Id
                                                        ]
                                                    }.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{
                                                        marginRight: "5px",
                                                        width: "1.5rem",
                                                    }}
                                                    data-tip={
                                                        summonerSpells[
                                                            data.spell1Id
                                                        ]
                                                    }
                                                />
                                                <img
                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${
                                                        summonerSpells[
                                                            data.spell2Id
                                                        ]
                                                    }.png`}
                                                    alt="summ1"
                                                    // className="summ1"
                                                    style={{ width: "1.5rem" }}
                                                    data-tip={
                                                        summonerSpells[
                                                            data.spell2Id
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                marginBottom: "10px",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <span style={{ fontSize: "15px" }}>
                                                {data.summonerName}
                                            </span>
                                            <PNoMargin
                                                style={{ fontSize: ".7rem" }}
                                            >
                                                {dataRankSummoners[index] ==
                                                undefined
                                                    ? `Nivel ${summLevel[index]}`
                                                    : `${dataRankSummoners[index].tier} - ${dataRankSummoners[index].rank} (${dataRankSummoners[index].leaguePoints} LP)`}
                                            </PNoMargin>
                                            {dataRankSummoners[index] !==
                                            undefined ? (
                                                <img
                                                    src={checkMiniCrest(
                                                        dataRankSummoners[index]
                                                            .tier
                                                    )}
                                                    alt="rank"
                                                    style={{
                                                        width: "2.5rem",
                                                        marginBottom: "-10px",
                                                    }}
                                                    data-tip={
                                                        dataRankSummoners[index]
                                                            ?.tier &&
                                                        ` ${dataRankSummoners[index]?.tier} ${dataRankSummoners[index]?.rank} - ${dataRankSummoners[index]?.leaguePoints} LP`
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    src={checkMiniCrest()}
                                                    alt="rank"
                                                    style={{
                                                        width: "2rem",
                                                        marginBottom: "-10px",
                                                    }}
                                                    data-tip={"UNRANKED"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <ReactTooltip />
                </div>
            ) : (
                <>
                    <Loader
                        type="TailSpin"
                        color="#00c0b1"
                        height={100}
                        width={100}
                        style={{ marginTop: "100px" }}
                    />
                </>
            )}
        </>
    );
};

export default LiveGame;
