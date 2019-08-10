// Server-private types.

export type ChallengesManifest = {
    challenges: string[]
};

export type ChallengeMeta = {
    name: string,
    descriptionFile: string,
    tests: number,
    starterCode: { [key: string]: string }
};