import lvl1 from "../assets/borderLevels/Level_1.png";
import lvl50 from "../assets/borderLevels/Level_50.png";
import lvl75 from "../assets/borderLevels/Level_75.png";
import lvl100 from "../assets/borderLevels/Level_100.png";
import lvl125 from "../assets/borderLevels/Level_125.png";
import lvl150 from "../assets/borderLevels/Level_150.png";
import lvl175 from "../assets/borderLevels/Level_175.png";
import lvl200 from "../assets/borderLevels/Level_200.png";
import lvl225 from "../assets/borderLevels/Level_225.png";
import lvl250 from "../assets/borderLevels/Level_250.png";
import lvl275 from "../assets/borderLevels/Level_275.png";
import lvl300 from "../assets/borderLevels/Level_300.png";
import lvl325 from "../assets/borderLevels/Level_325.png";
import lvl350 from "../assets/borderLevels/Level_350.png";
import lvl375 from "../assets/borderLevels/Level_375.png";
import lvl400 from "../assets/borderLevels/Level_400.png";
import lvl425 from "../assets/borderLevels/Level_425.png";
import lvl450 from "../assets/borderLevels/Level_450.png";
import lvl475 from "../assets/borderLevels/Level_475.png";
import lvl500 from "../assets/borderLevels/Level_500.png";

import crestUnranked from "../assets/ranked-mini-crest/unranked.png";
import crestIron from "../assets/ranked-mini-crest/iron.png";
import crestBronze from "../assets/ranked-mini-crest/bronze.png";
import crestSilver from "../assets/ranked-mini-crest/silver.png";
import crestGold from "../assets/ranked-mini-crest/gold.png";
import crestPlatinum from "../assets/ranked-mini-crest/platinum.png";
import crestDiamond from "../assets/ranked-mini-crest/diamond.png";
import crestMaster from "../assets/ranked-mini-crest/master.png";
import crestGrandmaster from "../assets/ranked-mini-crest/grandmaster.png";
import crestChallenger from "../assets/ranked-mini-crest/challenger.png";

export const checkLvl = (summonerLevel) => {
    if (summonerLevel >= 1 && summonerLevel < 50) {
        return lvl1;
    } else if (summonerLevel >= 50 && summonerLevel < 75) {
        return lvl50;
    } else if (summonerLevel >= 75 && summonerLevel < 100) {
        return lvl75;
    } else if (summonerLevel >= 100 && summonerLevel < 125) {
        return lvl100;
    } else if (summonerLevel >= 125 && summonerLevel < 150) {
        return lvl125;
    } else if (summonerLevel >= 150 && summonerLevel < 175) {
        return lvl150;
    } else if (summonerLevel >= 175 && summonerLevel < 200) {
        return lvl175;
    } else if (summonerLevel >= 200 && summonerLevel < 225) {
        return lvl200;
    } else if (summonerLevel >= 225 && summonerLevel < 250) {
        return lvl225;
    } else if (summonerLevel >= 250 && summonerLevel < 275) {
        return lvl250;
    } else if (summonerLevel >= 275 && summonerLevel < 300) {
        return lvl275;
    } else if (summonerLevel >= 300 && summonerLevel < 325) {
        return lvl300;
    } else if (summonerLevel >= 325 && summonerLevel < 350) {
        return lvl325;
    } else if (summonerLevel >= 350 && summonerLevel < 375) {
        return lvl350;
    } else if (summonerLevel >= 375 && summonerLevel < 400) {
        return lvl375;
    } else if (summonerLevel >= 400 && summonerLevel < 425) {
        return lvl400;
    } else if (summonerLevel >= 425 && summonerLevel < 450) {
        return lvl425;
    } else if (summonerLevel >= 450 && summonerLevel < 475) {
        return lvl450;
    } else if (summonerLevel >= 475 && summonerLevel < 500) {
        return lvl475;
    } else if (summonerLevel >= 500) {
        return lvl500;
    }
};

export const checkMiniCrest = (tier) => {
    switch (tier) {
        case "IRON":
            return crestIron;
        case "BRONZE":
            return crestBronze;
        case "SILVER":
            return crestSilver;
        case "GOLD":
            return crestGold;
        case "PLATINUM":
            return crestPlatinum;
        case "DIAMOND":
            return crestDiamond;
        case "MASTER":
            return crestMaster;
        case "GRANDMASTER":
            return crestGrandmaster;
        case "CHALLENGER":
            return crestChallenger;
        default:
            return crestUnranked;
    }
};
