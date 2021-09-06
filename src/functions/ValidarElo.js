import challenger from "../assets/img/Emblem_Challenger.png";
import grandmaster from "../assets/img/Emblem_Grandmaster.png";
import master from "../assets/img/Emblem_Master.png";
import diamond from "../assets/img/Emblem_Diamond.png";
import platinum from "../assets/img/Emblem_Platinum.png";
import gold from "../assets/img/Emblem_Gold.png";
import silver from "../assets/img/Emblem_Silver.png";
import bronze from "../assets/img/Emblem_Bronze.png";
import iron from "../assets/img/Emblem_Iron.png";

export const validarElo = (elo) => {
    switch (elo) {
        case "BRONZE":
            return bronze;
        case "IRON":
            return iron;
        case "SILVER":
            return silver;
        case "GOLD":
            return gold;
        case "PLATINUM":
            return platinum;
        case "DIAMOND":
            return diamond;
        case "GRANDMASTER":
            return grandmaster;
        case "MASTER":
            return master;
        case "CHALLENGER":
            return challenger;
        default:
            break;
    }
};

export const validarElo2 = (elo) => {
    switch (elo) {
        case "BRONZE":
            return "bronze";
        case "IRON":
            return "iron";
        case "SILVER":
            return "silver";
        case "GOLD":
            return "gold";
        case "PLATINUM":
            return "platinum";
        case "DIAMOND":
            return "diamond";
        case "GRANDMASTER":
            return "grandmaster";
        case "MASTER":
            return "master";
        case "CHALLENGER":
            return "challenger";
        default:
            break;
    }
};