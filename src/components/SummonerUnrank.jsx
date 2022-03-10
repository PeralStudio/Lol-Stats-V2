import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import unranked from "../assets/img/border-unranked.png";
import { champsId } from "../dataDragon/champsId";
import { queueId } from "../dataDragon/queueid";
import { ImgSummUnrank } from "../UI/SummonerUnrankUI";
import ReactTooltip from "react-tooltip";

import opgg from "../assets/img/opgg.png";
import { checkLvl } from "../functions/checkLevelBorder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import ChampMasteries from "./ChampMasteries";

const SummonerUnrank = ({ name, summData, err, dataLive, masteryChamps }) => {
    const [version, setVersion] = useState("");
    const historyUrl = useHistory();

    const found = queueId.find(
        (element) => element.queueId === dataLive.gameQueueConfigId
    );

    const foundSummId =
        dataLive &&
        dataLive.participants.find(
            (element) => element.summonerId === summData.id
        );
    const foundChampName =
        foundSummId &&
        champsId.find((element) => element.champId === foundSummId.championId);

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

    return (
        <>
            <div className="container-data">
                <h2 className="card-title" style={{ marginTop: "30px" }}>
                    {summData.name}
                    <img
                        src={checkLvl(summData.summonerLevel)}
                        alt="borderLvl"
                        className="opgg"
                        style={{
                            position: "absolute",
                            width: "4.8rem",
                            height: "4.8rem",
                            margin: "auto",
                            marginTop: "-12px",
                            zIndex: 1,
                        }}
                        data-tip={`Nivel ${summData.summonerLevel}`}
                    />
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summData.profileIconId}.png`}
                        className="card-img-top"
                        alt="..."
                        style={{
                            width: "4rem",
                            zoom: "0.8",
                            margin: "auto",
                            borderRadius: "50%",
                            marginLeft: "16px",
                        }}
                    />
                    <ReactTooltip />
                </h2>
                <ImgSummUnrank
                    src={unranked}
                    className="card-img-top"
                    alt="rank"
                    data-tip={`Unranked`}
                />
                {found && (
                    <p
                        onClick={() => {
                            historyUrl.push(`/livegame/${name}`);
                        }}
                        style={{
                            backgroundColor: "#EE4142",
                            width: "max-content",
                            margin: "auto",
                            marginTop: "10px",
                            borderRadius: "5px",
                            padding: "0px 5px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        En partida - ({found && found.description}) -{" "}
                        {foundChampName && foundChampName.name}
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${
                                foundChampName && foundChampName.name
                            }.png`}
                            alt=""
                            style={{
                                width: "1.5rem",
                                borderRadius: "50%",
                                margin: "1px 2px",
                                marginLeft: "5px",
                            }}
                        />
                    </p>
                )}
                <div className="card-body">
                    <h4>UNRANKED</h4>
                    <h5 className="card-title">
                        Nivel {summData.summonerLevel}
                    </h5>
                    {masteryChamps && (
                        <ChampMasteries
                            masteryChamps={masteryChamps}
                            version={version}
                        />
                    )}

                    <div style={{ margin: "20px" }}>
                        <Link to={`/histories/${name}`}>
                            <button
                                style={{ marginBottom: "20px" }}
                                type="button"
                                className="btn btn-outline-info"
                            >
                                Historial <FontAwesomeIcon icon={faHistory} />
                            </button>
                        </Link>
                    </div>
                    <a
                        href={`https://euw.op.gg/summoner/userName=${name}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {/* <ImgSummUnrank
                            src={opgg}
                            className="card-img-top"
                            alt="opgg"
                            style={{
                                width: "10rem",
                                margin: "auto",
                                marginBottom: '20px'
                            }}
                        /> */}
                    </a>
                </div>
            </div>
        </>
    );
};

export default SummonerUnrank;
