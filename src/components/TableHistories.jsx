import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";

import ReactTooltip from "react-tooltip";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import minions from "../assets/img/icon_minions.png";
import gold from "../assets/img/icon_gold.png";
import damageDealt from "../assets/img/kills.png";
import allItems from "../dataDragon/items.json";

import Paginations from "../hooks/Pagination";

import { ImgChampAvatar, ImgDamage, PGoldEarned, PNoMargin, PTable } from "../UI/TableHistoriesUi";
import { queueId } from "../dataDragon/queueid";
// import { queueId } from '../queueId/queueid';
import { summonerSpells } from "../dataDragon/generalData";

const TableHistories = ({ name, gamesArray }) => {
    const [version, setVersion] = useState("");
    const history = useHistory();

    const [ready, setReady] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    let NUM_OF_RECORDS = gamesArray.length;
    let LIMIT = 5;

    const onPageChanged = useCallback(
        (event, page) => {
            event.preventDefault();
            setCurrentPage(page);
        },
        [setCurrentPage]
    );

    const currentData = gamesArray.slice(
        (currentPage - 1) * LIMIT,
        (currentPage - 1) * LIMIT + LIMIT
    );

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
            future: "%s",
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
            yy: "hace %d años"
        }
    });

    let allGamesArrayObject = [];

    for (let allGames of currentData) {
        allGamesArrayObject.push(allGames);
    }

    let wins = 0;
    let losses = 0;
    let found = [];
    let dateObject;
    let minutes;
    let seconds;
    let timeString = [];
    let timeString2 = [];
    let foundQueueId = [];

    allGamesArrayObject.map((games, index) => {
        timeString2.push(dayjs.unix(games.gameDuration).format("mm:ss"));

        found.push(
            games &&
                games.participants.find(
                    (element) => element.summonerName.toLowerCase() === `${name.toLowerCase()}`
                )
        );

        found[index] != undefined && found[index].win === true ? (wins += 1) : (losses += 1);

        found[index] == undefined && (wins -= 0) & (losses -= 1);

        foundQueueId.push(games && queueId.find((element) => element.queueId === games.queueId));
    });

    const champUpperCase = (found) => {
        let champLowerCase = found.championName.toLowerCase();
        return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champLowerCase[0].toUpperCase()}${champLowerCase.slice(
            1
        )}.png`;
    };

    let nKills = 0;
    let nDeaths = 0;
    let nAssists = 0;

    for (let foundStats of found) {
        if (foundStats != undefined) {
            nKills = nKills + foundStats.kills;
            nDeaths = nDeaths + foundStats.deaths;
            nAssists = nAssists + foundStats.assists;
        }
    }

    const kda = ((nKills + nAssists) / (nDeaths < 1 ? 1 : nDeaths)).toFixed(2);

    const kdaColor = (kda) => {
        if (kda < 3) {
            return "#879292";
        } else if (kda >= 3 && kda < 4) {
            return "#2DAF7F";
        } else if (kda >= 4 && kda < 5) {
            return "#1D8ED3";
        } else if (kda >= 5) {
            return "#f9c851";
        }
    };

    const nameItem = (found) => {
        return allItems.data[found]?.name;
    };

    setTimeout(() => setReady(true), 6000);

    return (
        <>
            {ready ? (
                <>
                    <div>
                        <span style={{ color: "#2DAF7F" }}>V {wins} </span>-
                        <span style={{ color: "#ee5952" }}> L {losses}</span>
                    </div>

                    <div>
                        <span>({(nKills / currentData.length).toFixed(1)} /</span>
                        <span style={{ color: "#ee5952" }}>
                            {" "}
                            {(nDeaths / currentData.length).toFixed(1)}
                        </span>
                        <span> / {(nAssists / currentData.length).toFixed(1)})</span>
                        <p style={{ color: kdaColor(kda) }}>
                            {kda}
                            :1 KDA
                        </p>
                    </div>

                    <h1 style={{ fontSize: "2.2rem" }}>Historial</h1>

                    <div style={{ marginTop: "1rem" }}>
                        <table className="table table-dark table-striped">
                            <tbody>
                                {currentData.map(
                                    (games, index) =>
                                        games != undefined && (
                                            <>
                                                <tr
                                                    key={index++}
                                                    onClick={() =>
                                                        history.push(
                                                            `/history/${games && games.gameId}`
                                                        )
                                                    }
                                                    className={
                                                        found && games.gameDuration < 300
                                                            ? "grey"
                                                            : found[index].win
                                                            ? "green"
                                                            : "red"
                                                    }
                                                    style={{
                                                        border: `1px solid ${
                                                            found && games.gameDuration < 300
                                                                ? "#a3a1a1"
                                                                : found[index].win
                                                                ? "green"
                                                                : "red"
                                                        } `,
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <td
                                                        style={{
                                                            borderLeft: `6px solid ${
                                                                found && games.gameDuration < 300
                                                                    ? "#a3a1a1"
                                                                    : found[index].win
                                                                    ? "green"
                                                                    : "red"
                                                            } `
                                                        }}
                                                    >
                                                        {found && (
                                                            <ImgChampAvatar
                                                                src={
                                                                    found[index].championName ===
                                                                    "FiddleSticks"
                                                                        ? champUpperCase(
                                                                              found[index]
                                                                          )
                                                                        : `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${found[index].championName}.png`
                                                                }
                                                                alt="avatar"
                                                                data-tip={found[index].championName}
                                                            />
                                                        )}
                                                        {found && (
                                                            <div>
                                                                <img
                                                                    src={
                                                                        summonerSpells[
                                                                            found[index].summoner1Id
                                                                        ] !== undefined
                                                                            ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${
                                                                                  summonerSpells[
                                                                                      found[index]
                                                                                          .summoner1Id
                                                                                  ]
                                                                              }.png`
                                                                            : "https://img1.freepng.es/20180420/qzw/kisspng-emoji-question-mark-social-media-information-text-hollow-question-mark-5ad9839b06f3e7.9014074215242044430285.jpg"
                                                                    }
                                                                    alt="summ1"
                                                                    className="summ1"
                                                                    data-tip={
                                                                        summonerSpells[
                                                                            found[index].summoner1Id
                                                                        ]
                                                                    }
                                                                />
                                                                <img
                                                                    src={
                                                                        summonerSpells[
                                                                            found[index].summoner1Id
                                                                        ] !== undefined
                                                                            ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${
                                                                                  summonerSpells[
                                                                                      found[index]
                                                                                          .summoner2Id
                                                                                  ]
                                                                              }.png`
                                                                            : "https://img1.freepng.es/20180420/qzw/kisspng-emoji-question-mark-social-media-information-text-hollow-question-mark-5ad9839b06f3e7.9014074215242044430285.jpg"
                                                                    }
                                                                    alt="summ2"
                                                                    className="summ2"
                                                                    data-tip={
                                                                        summonerSpells[
                                                                            found[index].summoner2Id
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <PTable
                                                            className={
                                                                found && games.gameDuration < 300
                                                                    ? "winrate-grey"
                                                                    : found[index].win
                                                                    ? "winrate-green"
                                                                    : "winrate-red"
                                                            }
                                                        >
                                                            {found && games.gameDuration < 300
                                                                ? "REHECHA"
                                                                : found[index].win
                                                                ? "VICTORIA"
                                                                : "DERROTA"}
                                                        </PTable>
                                                        <PTable>
                                                            {foundQueueId &&
                                                                foundQueueId[index].description}
                                                        </PTable>
                                                        <p data-tip={"Daño Realizado"}>
                                                            {found &&
                                                                new Intl.NumberFormat(
                                                                    "es-Es"
                                                                ).format(
                                                                    found[index]
                                                                        .totalDamageDealtToChampions
                                                                )}
                                                            <ImgDamage
                                                                src={damageDealt}
                                                                alt="damage"
                                                            />
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            {found && found[index].item0 !== 0 && (
                                                                <>
                                                                    <img
                                                                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                                                            found &&
                                                                            found[index].item0
                                                                        }.png`}
                                                                        alt="item"
                                                                        className="img-items"
                                                                        data-tip={nameItem(
                                                                            found &&
                                                                                found[index].item0
                                                                        )}
                                                                    />
                                                                </>
                                                            )}
                                                            {found && found[index].item1 !== 0 && (
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                                                        found && found[index].item1
                                                                    }.png`}
                                                                    alt="item"
                                                                    className="img-items"
                                                                    data-tip={nameItem(
                                                                        found && found[index].item1
                                                                    )}
                                                                />
                                                            )}
                                                            {found && found[index].item2 !== 0 && (
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                                                        found && found[index].item2
                                                                    }.png`}
                                                                    alt="item"
                                                                    className="img-items"
                                                                    data-tip={nameItem(
                                                                        found && found[index].item2
                                                                    )}
                                                                />
                                                            )}
                                                            {found && found[index].item3 !== 0 && (
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                                                        found && found[index].item3
                                                                    }.png`}
                                                                    alt="item"
                                                                    className="img-items"
                                                                    data-tip={nameItem(
                                                                        found && found[index].item3
                                                                    )}
                                                                />
                                                            )}
                                                            {found && found[index].item4 !== 0 && (
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                                                        found && found[index].item4
                                                                    }.png`}
                                                                    alt="item"
                                                                    className="img-items"
                                                                    data-tip={nameItem(
                                                                        found && found[index].item4
                                                                    )}
                                                                />
                                                            )}
                                                            {found && found[index].item5 !== 0 && (
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${
                                                                        found && found[index].item5
                                                                    }.png`}
                                                                    alt="item"
                                                                    className="img-items"
                                                                    data-tip={nameItem(
                                                                        found && found[index].item5
                                                                    )}
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="kda-histories">
                                                            <PNoMargin data-tip={"KDA"}>
                                                                {`${
                                                                    found && found[index].kills
                                                                } / ${
                                                                    found && found[index].deaths
                                                                } / ${
                                                                    found && found[index].assists
                                                                }`}
                                                            </PNoMargin>
                                                        </div>
                                                        <PNoMargin
                                                            data-tip={"Total súbditos asesinados"}
                                                        >
                                                            {found &&
                                                                found[index].totalMinionsKilled +
                                                                    found[index]
                                                                        .neutralMinionsKilled}
                                                            <img
                                                                src={minions}
                                                                alt=""
                                                                style={{
                                                                    width: "0.7rem"
                                                                }}
                                                            />
                                                        </PNoMargin>
                                                    </td>
                                                    <td>
                                                        <PGoldEarned data-tip={"Oro Ganado"}>
                                                            {found &&
                                                                new Intl.NumberFormat(
                                                                    "de-DE"
                                                                ).format(found[index].goldEarned)}
                                                            <img
                                                                src={gold}
                                                                alt="gold"
                                                                style={{
                                                                    width: ".8rem",
                                                                    marginLeft: "2px",
                                                                    marginBottom: "2px"
                                                                }}
                                                            />
                                                        </PGoldEarned>
                                                        <p
                                                            style={{
                                                                margin: "0"
                                                            }}
                                                            data-tip={"Duración"}
                                                        >
                                                            {timeString2[index]}
                                                        </p>
                                                        <PNoMargin>{`${dayjs(
                                                            allGamesArrayObject[index].gameCreation
                                                        ).fromNow()}`}</PNoMargin>
                                                    </td>
                                                </tr>
                                                <br />

                                                <ReactTooltip place="top" effect="solid" />
                                            </>
                                        )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div
                        className="pagination-wrapper"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "1rem"
                        }}
                    >
                        <Paginations
                            totalRecords={NUM_OF_RECORDS}
                            pageLimit={LIMIT}
                            pageNeighbours={5}
                            onPageChanged={onPageChanged}
                            currentPage={currentPage}
                        />
                    </div>
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

export default TableHistories;
