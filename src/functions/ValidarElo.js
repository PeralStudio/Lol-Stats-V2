import challenger from "../assets/wings/wings_challenger.png";
import grandmaster from "../assets/wings/wings_grandmaster.png";
import master from "../assets/wings/wings_master.png";
import diamond from "../assets/wings/wings_diamond.png";
import platinum from "../assets/wings/wings_platinum.png";
import gold from "../assets/wings/wings_gold.png";
import silver from "../assets/wings/wings_silver.png";
import bronze from "../assets/wings/wings_bronze.png";
import iron from "../assets/wings/wings_iron.png";

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
