import React from "react";
import ReactTooltip from "react-tooltip";

import { champsId } from "../dataDragon/champsId";

const ChampMasteries = ({ masteryChamps, version }) => {
    const foundChampNameMastery0 =
        masteryChamps &&
        champsId.find(
            (element) => element.champId === masteryChamps[0].championId
        );
    const foundChampNameMastery1 =
        masteryChamps &&
        champsId.find(
            (element) => element.champId === masteryChamps[1].championId
        );
    const foundChampNameMastery2 =
        masteryChamps &&
        champsId.find(
            (element) => element.champId === masteryChamps[2].championId
        );

    return (
        <div
            style={{
                margin: "auto",
                backgroundColor: "#0A1D30",
                borderRadius: "10px",
                marginTop: "10px",
            }}
        >
            <p style={{ marginTop: "16px", fontSize: "1.5rem" }}>
                Maestría de Campeón
            </p>
            <div
                className="champs-masteries"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                }}
            >
                <div style={{ display: "grid" }}>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${
                            foundChampNameMastery0 &&
                            foundChampNameMastery0.name
                        }.png`}
                        alt=""
                        style={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                            margin: "1px 23px",
                            border: "2px solid #A77C23",
                        }}
                        data-tip={foundChampNameMastery0.name}
                    />
                    <div>
                        <img
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/icon-champ-tooltip-mastery.png`}
                            alt=""
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50%",
                                margin: "1px 2px",
                            }}
                        />
                        {masteryChamps[0].championLevel}
                        <p style={{ fontSize: "14px" }}>
                            {new Intl.NumberFormat().format(
                                masteryChamps[0].championPoints
                            )}
                        </p>
                    </div>
                </div>

                <div style={{ display: "grid" }}>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${
                            foundChampNameMastery1 &&
                            foundChampNameMastery1.name
                        }.png`}
                        alt=""
                        style={{
                            width: "5.5rem",
                            height: "5.5rem",
                            borderRadius: "50%",
                            margin: "1px 23px",
                            border: "2px solid #A77C23",
                        }}
                        data-tip={foundChampNameMastery1.name}
                    />
                    <div>
                        <img
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/icon-champ-tooltip-mastery.png`}
                            alt=""
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50%",
                                margin: "1px 2px",
                            }}
                        />
                        {masteryChamps[1].championLevel}
                        <p style={{ fontSize: "14px" }}>
                            {new Intl.NumberFormat().format(
                                masteryChamps[1].championPoints
                            )}
                        </p>
                    </div>
                </div>
                <div style={{ display: "grid" }}>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${
                            foundChampNameMastery2 &&
                            foundChampNameMastery2.name
                        }.png`}
                        alt=""
                        style={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                            margin: "1px 23px",
                            border: "2px solid #A77C23",
                        }}
                        data-tip={foundChampNameMastery2.name}
                    />
                    <div>
                        <img
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/icon-champ-tooltip-mastery.png`}
                            alt=""
                            style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50%",
                                margin: "1px 2px",
                            }}
                        />
                        {masteryChamps[2].championLevel}
                        <p style={{ fontSize: "14px" }}>
                            {new Intl.NumberFormat().format(
                                masteryChamps[2].championPoints
                            )}
                        </p>
                    </div>
                    <ReactTooltip />
                </div>
            </div>
        </div>
    );
};

export default ChampMasteries;
