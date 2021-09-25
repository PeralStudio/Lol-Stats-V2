import { useHistory } from "react-router-dom";
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

const TableHistories = ({ name, gamesArray }) => {

    const history = useHistory();

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

    let allGamesArrayObject = [];

    for (let allGames of gamesArray) {
        allGamesArrayObject.push(allGames);
    }

    let wins = 0;
    let losses = 0;
    let found = [];
    let dateObject;
    let minutes;
    let seconds;
    let timeString = [];
    let foundQueueId = [];


    allGamesArrayObject.map((games, index) => {

        found.push(
            games &&
            games.participants.find(
                (element) =>
                    element.summonerName.toLowerCase() === `${name.toLowerCase()}`
            ));

        found[index] != undefined && found[index].win === true ? (wins += 1) : (losses += 1);

        found[index] == undefined && (wins -= 0) & (losses -= 1);

        // Game Duration & Date play
        //
        dateObject = new Date(allGamesArrayObject[index] && allGamesArrayObject[index].gameDuration);
        // const hours = dateObject.getHours();
        minutes = dateObject.getMinutes();
        seconds = dateObject.getSeconds();
        timeString.push(`${minutes < 10 ? `0${minutes}` : minutes}m ${seconds < 10 ? `0${seconds}` : seconds}s`);

        foundQueueId.push(games &&
            queueId.find((element) => element.queueId === games.queueId));
    });

    const champUpperCase = (found) => {
        let champLowerCase = found.championName.toLowerCase();
        return `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${champLowerCase[0].toUpperCase()}${champLowerCase.slice(
            1
        )}.png`;
    };

    let nKills = 0;
    let nDeaths = 0;
    let nAssists = 0;

    for (let foundStats of found) {
        if (foundStats != undefined) {
            nKills = nKills + foundStats.kills
            nDeaths = nDeaths + foundStats.deaths
            nAssists = nAssists + foundStats.assists
        }
    }

    const kda = ((nKills + nAssists) / (nDeaths < 1 ? 1 : nDeaths)).toFixed(2);

    let posOrNeg = kda >= 3 ? "green" : "#ee5952";

    return (
        <>
            {gamesArray.length >= 10 ? (
                <>
                    <div>
                        <span style={{ color: "green" }}>V {wins} </span>-
                        <span style={{ color: "#ee5952" }}> L {losses}</span>
                    </div>

                    <div>
                        <span>
                            ({(nKills / gamesArray.length).toFixed(1)}{" "} /
                        </span>
                        <span style={{ color: "#ee5952" }}>
                            {" "}{(nDeaths / gamesArray.length).toFixed(1)}
                        </span>
                        <span>
                            {" "}/{" "}{(nAssists / gamesArray.length).toFixed(1)})
                        </span>
                        <p style={{ color: posOrNeg }}>
                            {kda}
                            :1
                        </p>
                    </div>


                    <div style={{ marginTop: "1rem" }}>
                        <table className="table table-dark table-striped">
                            <tbody>
                                {allGamesArrayObject.map((games, index) =>

                                    games != undefined && (
                                        <>
                                            <tr
                                                key={index++}
                                                onClick={() => history.push(`/history/${games && games.gameId}`)}
                                                className={
                                                    found && found[index].win ? "green" : "red"
                                                }
                                                style={{
                                                    border: `1px solid ${found && found[index].win ? "green" : "red"} `,
                                                    cursor: 'pointer'
                                                }}
                                            >

                                                <td
                                                    style={{
                                                        borderLeft: `6px solid ${found && found[index].win
                                                            ? "green"
                                                            : "red"
                                                            } `,
                                                    }}>
                                                    {found && (
                                                        <ImgChampAvatar
                                                            src={
                                                                found[index].championName ===
                                                                    "FiddleSticks"
                                                                    ? champUpperCase(
                                                                        found[index]
                                                                    )
                                                                    : `https://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${found[index].championName}.png`
                                                            }
                                                            alt="avatar"
                                                        />
                                                    )}
                                                    {
                                                        found && (
                                                            <div>
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/Summoner${summonerSpells[
                                                                        found[index]
                                                                            .summoner1Id
                                                                    ]
                                                                        }.png`}
                                                                    alt="summ1"
                                                                    className="summ1"
                                                                    data-tip={
                                                                        summonerSpells[
                                                                        found[index]
                                                                            .summoner1Id
                                                                        ]
                                                                    }
                                                                />
                                                                <img
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/spell/Summoner${summonerSpells[
                                                                        found[index]
                                                                            .summoner2Id
                                                                    ]
                                                                        }.png`}
                                                                    alt="summ2"
                                                                    className="summ2"
                                                                    data-tip={
                                                                        summonerSpells[
                                                                        found[index]
                                                                            .summoner2Id
                                                                        ]
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </td >
                                                <td>
                                                    <PTable
                                                        className={
                                                            found && found[index].win
                                                                ? "winrate-green"
                                                                : "winrate-red"
                                                        }>
                                                        {found && found[index].win
                                                            ? "VICTORIA"
                                                            : "DERROTA"}
                                                    </PTable>
                                                    <PTable>
                                                        {foundQueueId &&
                                                            foundQueueId[index].description}
                                                    </PTable>
                                                    <p>
                                                        {
                                                            found && new Intl.NumberFormat("es-Es").format(found[index].totalDamageDealtToChampions)
                                                        }
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
                                                                    src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${found && found[index].item0}.png`}
                                                                    alt="item"
                                                                    className="img-items"
                                                                    data-tip={
                                                                        index
                                                                    }
                                                                />
                                                            </>
                                                        )}
                                                        {found && found[index].item1 !== 0 && (
                                                            <img
                                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${found && found[index].item1}.png`}
                                                                alt="item"
                                                                className="img-items"
                                                            />
                                                        )}
                                                        {found && found[index].item2 !== 0 && (
                                                            <img
                                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${found && found[index].item2}.png`}
                                                                alt="item"
                                                                className="img-items"
                                                            />
                                                        )}
                                                        {found && found[index].item3 !== 0 && (
                                                            <img
                                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${found && found[index].item3}.png`}
                                                                alt="item"
                                                                className="img-items"
                                                            />
                                                        )}
                                                        {found && found[index].item4 !== 0 && (
                                                            <img
                                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${found && found[index].item4}.png`}
                                                                alt="item"
                                                                className="img-items"
                                                            />
                                                        )}
                                                        {found && found[index].item5 !== 0 && (
                                                            <img
                                                                src={`https://ddragon.leagueoflegends.com/cdn/11.19.1/img/item/${found && found[index].item5}.png`}
                                                                alt="item"
                                                                className="img-items"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="kda-histories">
                                                        <PNoMargin>
                                                            {`${found && found[index].kills} / ${found && found[index].deaths} / ${found && found[index].assists}`}
                                                        </PNoMargin>
                                                    </div>
                                                    <PNoMargin>
                                                        {found && found[index].totalMinionsKilled +
                                                            found[index].neutralMinionsKilled}
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
                                                        {found && new Intl.NumberFormat("de-DE").format(found[index].goldEarned)}
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
                                                    <PTable>{timeString[index]}</PTable>
                                                    <PNoMargin>{`${dayjs(allGamesArrayObject[index].gameCreation).fromNow()}`}</PNoMargin>
                                                </td>
                                            </tr >
                                            <br />

                                            <ReactTooltip
                                                place="top"
                                                effect="solid"
                                            />
                                        </>
                                    ))}
                            </tbody >
                        </table >
                    </div >
                </>) : (
                <Loader
                    type="TailSpin"
                    color="#00c0b1"
                    height={100}
                    width={100}
                    style={{ marginTop: "100px" }}
                />
            )}
        </>)
}


export default TableHistories;