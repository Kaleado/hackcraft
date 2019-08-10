import { RedisClient } from "redis";
import { 
    BackendError, 
    Challenge, 
    ChallengeId,
    Language, 
    GetChallengeRequest,
    missingKeys } from "../../shared";
import { ChallengesManifest, ChallengeMeta } from "./types";
import Fs from "fs";
import { getChallengeIdFromMatchId } from "./db";

const CHALLENGE_PATH_BASE = "./data/challenges";
const MANIFEST_FILE = `${CHALLENGE_PATH_BASE}/manifest.json`;

export let metaPath = (id: ChallengeId) => `${CHALLENGE_PATH_BASE}/${id}/meta.json`;
let starterCodePath = (id: ChallengeId, lang: Language) => `${CHALLENGE_PATH_BASE}/${id}/starter/${lang}.txt`;
let descriptionPath = (id: ChallengeId) => `${CHALLENGE_PATH_BASE}/${id}/question.md`;

export function chooseRandomChallenge(): ChallengeId {
    let manifest: ChallengesManifest = readManifest();
    const n: number = manifest.challenges.length;
    return manifest.challenges[Math.floor(Math.random() * n)];
}

export function readManifest(): ChallengesManifest {
    return JSON.parse(Fs.readFileSync(MANIFEST_FILE).toString());
}

export function readStarterCode(challengeId: ChallengeId, lang: Language): string {
    return Fs.readFileSync(starterCodePath(challengeId, lang)).toString();
}

export function readMeta(challengePath: string): ChallengeMeta {
    return JSON.parse(Fs.readFileSync(challengePath).toString());
}

export function readDescriptionFile(challengeId: ChallengeId): string {
    return Fs.readFileSync(descriptionPath(challengeId)).toString();
}

export async function getChallenge(req, res, dbClient: RedisClient) : Promise<Challenge | BackendError> {
    let body: GetChallengeRequest = req.body;
    const missing: string[] = missingKeys(body, ["language", "matchId"]);
    if(missing.length > 0){
        return {
            reason: "Missing required parameters: " + missing.toString()
        };
    }
    try {
        let challengeIdForMatch: ChallengeId = await getChallengeIdFromMatchId(dbClient, body.matchId);
        let meta: ChallengeMeta = readMeta(metaPath(challengeIdForMatch));
        let starterCode: string = readStarterCode(challengeIdForMatch, body.language);
        let description: string = readDescriptionFile(challengeIdForMatch);
        let starterCodeObj = {};
        starterCodeObj[body.language] = starterCode;
        return {
            name: meta.name,
            description: description,
            numTests: 3,
            starterCode: starterCodeObj
        };
    }
    catch(exc) {
        return { reason: exc };
    }
}
