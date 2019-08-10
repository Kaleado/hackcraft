import { RedisClient } from "redis";
import { 
    BackendError, 
    Challenge } from "../../shared";

export async function getChallenge(req, res, dbClient: RedisClient) : Promise<Challenge | BackendError> {
    return {
        name: "Fake Challenge",
        description: "Bogdanoff? Yes? Ee deed eet. E bort? E went all in. \n Domp it.",
        numTests: 3,
        starterCode: {
            "python3": "dont use python",
            "c++": "much better"
        }
    };
}