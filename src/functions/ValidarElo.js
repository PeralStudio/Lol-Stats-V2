import challenger from "../assets/Emblems/Challenger.png";
import grandmaster from "../assets/Emblems/Grandmaster.png";
import master from "../assets/Emblems/Master.png";
import diamond from "../assets/Emblems/Diamond.png";
import platinum from "../assets/Emblems/Platinum.png";
import gold from "../assets/Emblems/Gold.png";
import silver from "../assets/Emblems/Silver.png";
import bronze from "../assets/Emblems/Bronze.png";
import iron from "../assets/Emblems/Iron.png";

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
