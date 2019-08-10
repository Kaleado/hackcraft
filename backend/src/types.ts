export type ChallengesManifest = {
    challenges: string[]
};

export type ChallengeMeta = {
    name: string,
    descriptionFile: string,
    tests: { script: string }[],
    starterCode: { [key: string]: string }
};