const fs = require("fs");
const path = require("path");

async function readJSONFile(path) {
  const response = await fs.readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(response);
}

async function foo() {
  const owgSports = await readJSONFile(
    path.resolve(__dirname, "./commonCodes/owgSports.json")
  );
  const pwgSports = await readJSONFile(
    path.resolve(__dirname, "./commonCodes/pwgSports.json")
  );

  const competitionCode = payload["OdfBody"]["$"]["CompetitionCode"];
  const sportName =
    competitionCode === "OWG2022"
      ? owgSports.find((sport) => sport.sportCode).sport
      : pwgSports.find((sport) => sport.sportCode).sport;

  console.log(sportName);
}

foo();
