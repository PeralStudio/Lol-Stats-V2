import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import ReactTooltip from "react-tooltip";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import minions from "../assets/img/icon_minions.png";
import gold from "../assets/img/icon_gold.png";
import damageDealt from "../assets/img/kills.png";

import {
    ImgChampAvatar,
    ImgDamage,
    PGoldEarned,
    PNoMargin,
    PTable,
} from "../UI/TableHistoriesUi";
import { queueId } from "../dataDragon/queueid";
// import { queueId } from '../queueId/queueid';

const TableHistories = ({
    gameOne,
    gameTwo,
    gameThree,
    gameFour,
    gameFive,
    name,
    gameSix,
    gameSeven,
    gameEight,
    gameNine,
    gameTen
}) => {
    const allGamesArray = [gameOne, gameTwo, gameThree, gameFour, gameFive, gameSix, gameSeven, gameEight, gameNine, gameTen];

    dayjs.updateLocale("en", {
        relativeTime: {
            future: "en %s",
            past: "%s",
            s: "hace unos segundos",
            m: "un minuto",
            mm: "hace %d minutos",
            h: "hace una hora",
            hh: "hace %d horas",
            d: "hace un día",
            dd: "hace %d días",
            M: "un mes",
            MM: "hace %d meses",
            y: "un año",
            yy: "hace %d años",
        },
    });

    const summonerSpells = {
        21: "Barrier",
        1: "Boost",
        14: "Dot",
        3: "Exhaust",
        4: "Flash",
        6: "Haste",
        7: "Heal",
        13: "Mana",
        30: "To the King!",
        31: "Poro Toss",
        32: "Snowball",
        11: "Smite",
        39: "Mark",
        12: "Teleport",
        54: "Placeholder",
    };

    const found0 =
        gameOne &&
        gameOne.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found1 =
        gameTwo &&
        gameTwo.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found2 =
        gameThree &&
        gameThree.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found3 =
        gameFour &&
        gameFour.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found4 =
        gameFive &&
        gameFive.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );

    const found5 =
        gameSix &&
        gameSix.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found6 =
        gameSeven &&
        gameSeven.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found7 =
        gameEight &&
        gameEight.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found8 =
        gameNine &&
        gameNine.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );
    const found9 =
        gameTen &&
        gameTen.participants.find(
            (element) =>
                element.summonerName.toLowerCase() === `${name.toLowerCase()}`
        );

    let wins = 0;
    let losses = 0;

    found0 != undefined && found0.win === true ? (wins += 1) : (losses += 1);
    found1 != undefined && found1.win === true ? (wins += 1) : (losses += 1);
    found2 != undefined && found2.win === true ? (wins += 1) : (losses += 1);
    found3 != undefined && found3.win === true ? (wins += 1) : (losses += 1);
    found4 != undefined && found4.win === true ? (wins += 1) : (losses += 1);
    found5 != undefined && found5.win === true ? (wins += 1) : (losses += 1);
    found6 != undefined && found6.win === true ? (wins += 1) : (losses += 1);
    found7 != undefined && found7.win === true ? (wins += 1) : (losses += 1);
    found8 != undefined && found8.win === true ? (wins += 1) : (losses += 1);
    found9 != undefined && found9.win === true ? (wins += 1) : (losses += 1);

    found5 == undefined && (wins -= 0) & (losses += 1)
    found6 == undefined && (wins -= 0) & (losses -= 1)
    found7 == undefined && (wins -= 0) & (losses -= 1)
    found8 == undefined && (wins -= 0) & (losses -= 1)
    found9 == undefined && (wins -= 0) & (losses -= 1)

    // Game Duration & Date play
    //
    const dateObject0 = new Date(gameOne && gameOne.gameDuration);
    // const hours = dateObject.getHours();
    const minutes0 = dateObject0.getMinutes();
    const seconds0 = dateObject0.getSeconds();
    const timeString0 = `${minutes0 < 10 ? `0${minutes0}` : minutes0}m ${seconds0 < 10 ? `0${seconds0}` : seconds0
        }s`;

    const dateObject1 = new Date(gameTwo && gameTwo.gameDuration);
    // const hours = dateObject.getHours();
    const minutes1 = dateObject1.getMinutes();
    const seconds1 = dateObject1.getSeconds();
    const timeString1 = `${minutes1 < 10 ? `0${minutes1}` : minutes1}m ${seconds1 < 10 ? `0${seconds1}` : seconds1
        }s`;

    const dateObject2 = new Date(gameThree && gameThree.gameDuration);
    // const hours = dateObject.getHours();
    const minutes2 = dateObject2.getMinutes();
    const seconds2 = dateObject2.getSeconds();
    const timeString2 = `${minutes2 < 10 ? `0${minutes2}` : minutes2}m ${seconds2 < 10 ? `0${seconds2}` : seconds2
        }s`;

    const dateObject3 = new Date(gameFour && gameFour.gameDuration);
    // const hours = dateObject.getHours();
    const minutes3 = dateObject3.getMinutes();
    const seconds3 = dateObject3.getSeconds();
    const timeString3 = `${minutes3 < 10 ? `0${minutes3}` : minutes3}m ${seconds3 < 10 ? `0${seconds3}` : seconds3
        }s`;

    const dateObject4 = new Date(gameFive && gameFive.gameDuration);
    // const hours = dateObject.getHours();
    const minutes4 = dateObject4.getMinutes();
    const seconds4 = dateObject4.getSeconds();
    const timeString4 = `${minutes4 < 10 ? `0${minutes4}` : minutes4}m ${seconds4 < 10 ? `0${seconds4}` : seconds4
        }s`;

    const dateObject5 = new Date(gameSix && gameSix.gameDuration);
    // const hours = dateObject.getHours();
    const minutes5 = dateObject5.getMinutes();
    const seconds5 = dateObject5.getSeconds();
    const timeString5 = `${minutes5 < 10 ? `0${minutes5}` : minutes5}m ${seconds5 < 10 ? `0${seconds5}` : seconds5
        }s`;

    const dateObject6 = new Date(gameSeven && gameSeven.gameDuration);
    // const hours = dateObject.getHours();
    const minutes6 = dateObject6.getMinutes();
    const seconds6 = dateObject6.getSeconds();
    const timeString6 = `${minutes6 < 10 ? `0${minutes6}` : minutes6}m ${seconds6 < 10 ? `0${seconds6}` : seconds6
        }s`;

    const dateObject7 = new Date(gameEight && gameEight.gameDuration);
    // const hours = dateObject.getHours();
    const minutes7 = dateObject7.getMinutes();
    const seconds7 = dateObject7.getSeconds();
    const timeString7 = `${minutes7 < 10 ? `0${minutes7}` : minutes7}m ${seconds7 < 10 ? `0${seconds7}` : seconds7
        }s`;

    const dateObject8 = new Date(gameNine && gameNine.gameDuration);
    // const hours = dateObject.getHours();
    const minutes8 = dateObject8.getMinutes();
    const seconds8 = dateObject8.getSeconds();
    const timeString8 = `${minutes8 < 10 ? `0${minutes8}` : minutes8}m ${seconds8 < 10 ? `0${seconds8}` : seconds8
        }s`;

    const dateObject9 = new Date(gameTen && gameTen.gameDuration);
    // const hours = dateObject.getHours();
    const minutes9 = dateObject9.getMinutes();
    const seconds9 = dateObject9.getSeconds();
    const timeString9 = `${minutes9 < 10 ? `0${minutes9}` : minutes9}m ${seconds9 < 10 ? `0${seconds9}` : seconds9
        }s`;

    //------------------ Sacar el tipo de cola de una Game ------------------

    // console.log(gameOne && gameOne.queueId);

    // const foundId0 = queueId.find(element => element.queueId == `${gameOne && gameOne.queueId}`);

    // console.log(foundId0);
    const champUpperCase = (found) => {
        let champLowerCase = found.championName.toLowerCase();
        return `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${champLowerCase[0].toUpperCase()}${champLowerCase.slice(
            1
        )}.png`;
    };

    const foundQueueId0 =
        gameOne &&
        queueId.find((element) => element.queueId === gameOne.queueId);
    const foundQueueId1 =
        gameTwo &&
        queueId.find((element) => element.queueId === gameTwo.queueId);
    const foundQueueId2 =
        gameThree &&
        queueId.find((element) => element.queueId === gameThree.queueId);
    const foundQueueId3 =
        gameFour &&
        queueId.find((element) => element.queueId === gameFour.queueId);
    const foundQueueId4 =
        gameFive &&
        queueId.find((element) => element.queueId === gameFive.queueId);
    const foundQueueId5 =
        gameSix &&
        queueId.find((element) => element.queueId === gameSix.queueId);
    const foundQueueId6 =
        gameSeven &&
        queueId.find((element) => element.queueId === gameSeven.queueId);
    const foundQueueId7 =
        gameEight &&
        queueId.find((element) => element.queueId === gameEight.queueId);
    const foundQueueId8 =
        gameNine &&
        queueId.find((element) => element.queueId === gameNine.queueId);
    const foundQueueId9 =
        gameTen &&
        queueId.find((element) => element.queueId === gameTen.queueId);

    let posOrNeg =
        (found0 != undefined) &
            (found1 != undefined) &
            (found2 != undefined) &
            (found3 != undefined) &
            (found4 != undefined) &
            (found5 != undefined) &
            (found6 != undefined) &
            (found7 != undefined) &
            (found8 != undefined) &
            (found9 != undefined)
            &&
            (
                ((found0.kills +
                    found1.kills +
                    found2.kills +
                    found3.kills +
                    found4.kills +
                    found5.kills +
                    found6.kills +
                    found7.kills +
                    found8.kills +
                    found9.kills) /
                    5 +
                    (found0.assists +
                        found1.assists +
                        found2.assists +
                        found3.assists +
                        found4.assists +
                        found5.assists +
                        found6.assists +
                        found7.assists +
                        found8.assists +
                        found9.assists) /
                    5) /
                ((found0.deaths +
                    found1.deaths +
                    found2.deaths +
                    found3.deaths +
                    found4.deaths +
                    found5.deaths +
                    found6.deaths +
                    found7.deaths +
                    found8.deaths +
                    found9.deaths) /
                    5)
            ).toFixed(2) > 3
            ? "green"
            : "#ee5952";

    return (
        <>
            {allGamesArray ? (
                <>
                    <div>
                        <span style={{ color: "green" }}>V {wins} </span>-
                        <span style={{ color: "#ee5952" }}> L {losses}</span>
                    </div>
                    {(found0 != undefined) &
                        (found1 != undefined) &
                        (found2 != undefined) &
                        (found3 != undefined) &
                        (found4 != undefined) &
                        (found5 != undefined) &
                        (found6 != undefined) &
                        (found7 != undefined) &
                        (found8 != undefined) &
                        (found9 != undefined)
                        && (
                            <div>
                                <span>
                                    (
                                    {(found0.kills +
                                        found1.kills +
                                        found2.kills +
                                        found3.kills +
                                        found4.kills +
                                        found5.kills +
                                        found6.kills +
                                        found7.kills +
                                        found8.kills +
                                        found9.kills) /
                                        allGamesArray.length}{" "}
                                    /
                                </span>
                                <span style={{ color: "#ee5952" }}>
                                    {" "}
                                    {(found0.deaths +
                                        found1.deaths +
                                        found2.deaths +
                                        found3.deaths +
                                        found4.deaths +
                                        found5.deaths +
                                        found6.deaths +
                                        found7.deaths +
                                        found8.deaths +
                                        found9.deaths) /
                                        allGamesArray.length}
                                </span>
                                <span>
                                    {" "}
                                    /{" "}
                                    {(found0.assists +
                                        found1.assists +
                                        found2.assists +
                                        found3.assists +
                                        found4.assists +
                                        found5.assists +
                                        found6.assists +
                                        found7.assists +
                                        found8.assists +
                                        found9.assists) /
                                        allGamesArray.length}
                                    )
                                </span>
                                <p style={{ color: posOrNeg }}>
                                    {(
                                        ((found0.kills +
                                            found1.kills +
                                            found2.kills +
                                            found3.kills +
                                            found4.kills +
                                            found5.kills +
                                            found6.kills +
                                            found7.kills +
                                            found8.kills +
                                            found9.kills) /
                                            5 +
                                            (found0.assists +
                                                found1.assists +
                                                found2.assists +
                                                found3.assists +
                                                found4.assists +
                                                found5.assists +
                                                found6.assists +
                                                found7.assists +
                                                found8.assists +
                                                found9.assists) /
                                            5) /
                                        ((found0.deaths +
                                            found1.deaths +
                                            found2.deaths +
                                            found3.deaths +
                                            found4.deaths +
                                            found5.deaths +
                                            found6.deaths +
                                            found7.deaths +
                                            found8.deaths +
                                            found9.deaths) /
                                            5)
                                    ).toFixed(2)}
                                    :1
                                </p>
                            </div>
                        )}
                    <div style={{ marginTop: "1rem" }}>


                        <table className="table table-dark table-striped">
                            <tbody>
                                {gameOne != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found0.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found0.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found0.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameOne &&
                                                        gameOne.gameId
                                                        }`}>
                                                    {found0 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found0.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found0
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found0.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {found0 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found0
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found0
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found0
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found0
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found0.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameOne && found0.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameOne &&
                                                        foundQueueId0.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found0.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found0.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found0.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found0.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found0.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found0.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found0.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found0.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div className="kda-histories">
                                                    <PNoMargin>
                                                        {`${found0.kills} / ${found0.deaths} / ${found0.assists}`}
                                                    </PNoMargin>
                                                </div>
                                                <PNoMargin>
                                                    {found0.totalMinionsKilled +
                                                        found0.neutralMinionsKilled}
                                                    <img
                                                        src={minions}
                                                        alt=""
                                                        style={{
                                                            width: "0.7rem",
                                                        }}
                                                    />
                                                </PNoMargin>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found0.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <PTable>{timeString0}</PTable>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameOne.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameOne.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}


                                {gameTwo != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found1.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found1.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found1.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameTwo &&
                                                        gameTwo.gameId
                                                        }`}>
                                                    {found1 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found1.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found1
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found1.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {found1 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found1
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found1
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found1
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found1
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found1.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameTwo && found1.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameTwo &&
                                                        foundQueueId1.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found1.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found1.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found1.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found1.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found1.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found1.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found1.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found1.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found1.kills} / ${found1.deaths} / ${found1.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found1.totalMinionsKilled +
                                                            found1.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found1.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString1}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameTwo.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameTwo.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}


                                {gameThree != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found2.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found2.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found2.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameThree &&
                                                        gameThree.gameId
                                                        }`}>
                                                    {found2 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found2.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found2
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found2.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {found2 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found2
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found2
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found2
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found2
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found2.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameThree && found2.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameThree &&
                                                        foundQueueId2.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found2.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found2.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found2.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found2.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found2.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found2.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found2.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found2.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found2.kills} / ${found2.deaths} / ${found2.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found2.totalMinionsKilled +
                                                            found2.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found2.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString2}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameThree.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameThree.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}


                                {gameFour != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found3.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found3.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found3.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameFour &&
                                                        gameFour.gameId
                                                        }`}>
                                                    {found3 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found3.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found3
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found3.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {found3 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found3
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found3
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found3
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found3
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found3.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameFour && found3.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameFour &&
                                                        foundQueueId3.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found3.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found3.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found3.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found3.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found3.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found3.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found3.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found3.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found3.kills} / ${found3.deaths} / ${found3.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found3.totalMinionsKilled +
                                                            found3.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found3.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString3}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameFour.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameFour.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}


                                {gameFive != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found4.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found4.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found4.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameFive &&
                                                        gameFive.gameId
                                                        }`}>
                                                    {found4 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found4.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found4
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found4.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found4.championName}</p> */}
                                                {found4 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found4
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found4
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found4
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found4
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found4.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameFive && found4.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameFive &&
                                                        foundQueueId4.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found4.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found4.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found4.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found4.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found4.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found4.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found4.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found4.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found4.kills} / ${found4.deaths} / ${found4.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found4.totalMinionsKilled +
                                                            found4.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found4.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString4}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameFive.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameFive.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}












                                {gameSix != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found5.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found5.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found5.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameSix &&
                                                        gameSix.gameId
                                                        }`}>
                                                    {found5 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found5.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found5
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found5.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found5.championName}</p> */}
                                                {found5 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found5
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found5
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found5
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found5
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found5.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameSix && found5.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameSix &&
                                                        foundQueueId5.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found5.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found5.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found5.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found5.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found5.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found5.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found5.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found5.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found5.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found5.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found5.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found5.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found5.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found5.kills} / ${found5.deaths} / ${found5.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found5.totalMinionsKilled +
                                                            found5.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found5.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString5}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameSix.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameSix.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}




                                {gameSeven != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found6.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found6.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found6.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameSeven &&
                                                        gameSeven.gameId
                                                        }`}>
                                                    {found6 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found6.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found6
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found6.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found6.championName}</p> */}
                                                {found6 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found6
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found6
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found6
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found6
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found6.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameSeven && found6.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameSeven &&
                                                        foundQueueId6.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found6.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found6.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found6.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found6.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found6.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found6.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found6.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found6.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found6.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found6.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found6.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found6.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found6.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found6.kills} / ${found6.deaths} / ${found6.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found6.totalMinionsKilled +
                                                            found6.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found6.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString6}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameSeven.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameSeven.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}




                                {gameEight != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found7.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found7.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found7.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameSeven &&
                                                        gameEight.gameId
                                                        }`}>
                                                    {found7 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found7.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found7
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found7.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found7.championName}</p> */}
                                                {found7 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found7
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found7
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found7
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found7
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found7.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameEight && found7.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameEight &&
                                                        foundQueueId7.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found7.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found7.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found7.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found7.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found7.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found7.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found7.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found7.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found7.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found7.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found7.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found7.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found7.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found7.kills} / ${found7.deaths} / ${found7.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found7.totalMinionsKilled +
                                                            found7.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found7.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString7}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameEight.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameEight.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}



                                {gameNine != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found8.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found8.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found8.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameNine &&
                                                        gameNine.gameId
                                                        }`}>
                                                    {found8 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found8.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found8
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found8.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found8.championName}</p> */}
                                                {found8 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found8
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found8
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found8
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found8
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found8.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameNine && found8.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameNine &&
                                                        foundQueueId8.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found8.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found8.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found8.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found8.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found8.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found8.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found8.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found8.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found8.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found8.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found8.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found8.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found8.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found8.kills} / ${found8.deaths} / ${found8.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found8.totalMinionsKilled +
                                                            found8.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found8.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString8}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameNine.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameNine.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}



                                {gameTen != undefined && (
                                    <>
                                        <tr
                                            className={
                                                found9.win ? "green" : "red"
                                            }
                                            style={{
                                                border: `1px solid ${found9.win ? "green" : "red"
                                                    }`,
                                            }}>
                                            <td
                                                style={{
                                                    borderLeft: `6px solid ${found9.win
                                                        ? "green"
                                                        : "red"
                                                        }`,
                                                }}>
                                                <Link
                                                    to={`/history/${gameTen &&
                                                        gameTen.gameId
                                                        }`}>
                                                    {found9 && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found9.championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found9
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${found9.championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                </Link>
                                                {/* <p style={{ fontSize: '.8rem', marginBottom: '0' }}>{found9.championName}</p> */}
                                                {found9 && (
                                                    <div>
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found9
                                                                    .summoner1Id
                                                            ]
                                                                }.png`}
                                                            alt="summ1"
                                                            className="summ1"
                                                            data-tip={
                                                                summonerSpells[
                                                                found9
                                                                    .summoner1Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.16.1/img/spell/Summoner${summonerSpells[
                                                                found9
                                                                    .summoner2Id
                                                            ]
                                                                }.png`}
                                                            alt="summ2"
                                                            className="summ2"
                                                            data-tip={
                                                                summonerSpells[
                                                                found9
                                                                    .summoner2Id
                                                                ]
                                                            }
                                                        />
                                                        <ReactTooltip
                                                            place="top"
                                                            effect="solid"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <PTable
                                                    className={
                                                        found9.win
                                                            ? "winrate-green"
                                                            : "winrate-red"
                                                    }>
                                                    {gameTen && found9.win
                                                        ? "VICTORIA"
                                                        : "DERROTA"}
                                                </PTable>
                                                <PTable>
                                                    {gameTen &&
                                                        foundQueueId9.description}
                                                </PTable>
                                                <p>
                                                    {
                                                        found9.totalDamageDealtToChampions
                                                    }
                                                    <ImgDamage
                                                        src={damageDealt}
                                                        alt="damage"
                                                    />
                                                </p>
                                            </td>
                                            <td>
                                                <div>
                                                    {found9.item0 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found9.item0}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found9.item1 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found9.item1}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found9.item2 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found9.item2}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found9.item3 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found9.item3}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found9.item4 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found9.item4}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                    {found9.item5 !== 0 && (
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/11.14.1/img/item/${found9.item5}.png`}
                                                            alt="item"
                                                            className="img-items"
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found9.kills} / ${found9.deaths} / ${found9.assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found9.totalMinionsKilled +
                                                            found9.neutralMinionsKilled}
                                                        <img
                                                            src={minions}
                                                            alt=""
                                                            style={{
                                                                width: "0.7rem",
                                                            }}
                                                        />
                                                    </PNoMargin>
                                                </div>
                                            </td>
                                            <td>
                                                <PGoldEarned>
                                                    {found9.goldEarned}
                                                    <img
                                                        src={gold}
                                                        alt="gold"
                                                        style={{
                                                            width: ".8rem",
                                                            marginLeft: "2px",
                                                            marginBottom: "2px",
                                                        }}
                                                    />
                                                </PGoldEarned>
                                                <p
                                                    style={{
                                                        fontSize: "12px",
                                                        margin: "0",
                                                    }}>
                                                    {timeString9}
                                                </p>
                                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{`${dayjs(gameNine.gameCreation).format("DD/MM/YYYY HH:mm")}`}</p> */}
                                                {`${dayjs(
                                                    gameTen.gameCreation
                                                ).fromNow()}`}
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                )}


                            </tbody>
                        </table>
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
