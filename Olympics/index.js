let xmlParsedBodyToJson = {
  OdfBody: {
    $: {
      CompetitionCode: "OWG2022",
      DocumentCode: "HIP-------------------------------",
      DocumentType: "DT_SCHEDULE",
      Version: "3",
      FeedFlag: "P",
      Date: "2022-03-21",
      Time: "115021245",
      LogicalDate: "2022-03-21",
      Source: "ODS",
    },
    Competition: [
      {
        Session: [
          {
            $: {
              SessionCode: "PIH987",
              StartDate: "2022-02-06T20:05:00+08:00",
              EndDate: "2022-03-06T22:05:00+08:00",
              Leadin: "0:00",
              Venue: "USA",
              VenueName: "National Indoor Stadium",
              SessionType: "EVE",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Session 8",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "PIH988",
              StartDate: "2022-02-08T09:35:00+08:00",
              EndDate: "2022-03-08T11:35:00+08:00",
              Leadin: "0:00",
              Venue: "NIS",
              VenueName: "National Indoor Stadium",
              SessionType: "MOR",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Session 9",
                },
              },
            ],
          },
        ],
        Unit: [
          {
            $: {
              Code: "BKBMTEAM5-------------GPA-0001----",
              PhaseType: "2",
              ScheduleStatus: "SCHEDULED",
              StartDate: "2022-02-17T12:00:00+08:00",
              HideStartDate: "N",
              EndDate: "2022-02-17T13:00:00+08:00",
              HideEndDate: "N",
              Venue: "NIS",
              Location: "NIS",
              MediaAccess: "OPE",
              ModificationIndicator: "U",
              SessionCode: "BOB05",
            },
            ItemName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Men's Practice Men's Pre-Game SVK",
                },
              },
              {
                $: {
                  Language: "CHI",
                  Value: "Men's Practice Men's Pre-Game",
                },
              },
            ],
            ItemDescription: [
              {
                _: "<p>M SF1 (Away) MNA SVK</p>",
                $: {
                  Language: "ENG",
                },
              },
              {
                _: "<p>M SF (TBA) MNA</p>",
                $: {
                  Language: "SPA",
                },
              },
            ],
            VenueDescription: [
              {
                $: {
                  VenueName: "National Indoor Stadium",
                  LocationName: "National Indoor Stadium",
                },
              },
            ],
          },
          {
            $: {
              Code: "TENMSINGLES-----------FNL-0001----",
              PhaseType: "3",
              UnitNum: "11",
              ScheduleStatus: "SCHEDULED",
              StartDate: "2016-08-05T13:00:00+05:00",
              HideStartDate: "Y",
              EndDate: "2016-08-05T13:30:00+05:00",
              HideEndDate: "Y",
              Medal: "1",
              Venue: "WEM",
              Location: "TE0",
              SessionCode: "TEN12",
            },
            StartText: [
              {
                $: {
                  Language: "ENG",
                  Value: "followed by",
                },
              },
            ],
            ItemName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Men's Singles Gold Medal Match",
                },
              },
            ],
            VenueDescription: [
              {
                $: {
                  VenueName: "Wimbledon",
                  LocationName: "Centre Court",
                },
              },
            ],
            StartList: [
              {
                Start: [
                  {
                    $: {
                      SortOrder: "1",
                      StartOrder: "1",
                    },
                    Competitor: [
                      {
                        $: {
                          Code: "1051631",
                          Type: "A",
                          Organisation: "BLR",
                        },
                        Composition: [
                          {
                            Athlete: [
                              {
                                $: {
                                  Code: "1051631",
                                  Order: "1",
                                },
                                Description: [
                                  {
                                    $: {
                                      GivenName: "Barry",
                                      FamilyName: "Smith",
                                      Gender: "M",
                                      Organisation: "BLR",
                                      BirthDate: "1983-07-23",
                                      IFId: "397806",
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    $: {
                      SortOrder: "2",
                      StartOrder: "2",
                    },
                    Competitor: [
                      {
                        $: {
                          Code: "1131104",
                          Type: "A",
                          Organisation: "USA",
                        },
                        Composition: [
                          {
                            Athlete: [
                              {
                                $: {
                                  Code: "1131104",
                                  Order: "1",
                                },
                                Description: [
                                  {
                                    $: {
                                      GivenName: "Bobby",
                                      FamilyName: "Jones",
                                      Gender: "M",
                                      Organisation: "USA",
                                      BirthDate: "1969-10-23",
                                      IFId: "573006",
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

const fs = require("fs");
const path = require("path");

async function eventsGenerator(payload) {
  const events = {};
  const owgSports = await readJSONFile(
    path.resolve(__dirname, "./commonCodes/owgSports.json")
  );
  const pwgSports = await readJSONFile(
    path.resolve(__dirname, "./commonCodes/pwgSports.json")
  );
  const owgSportsSpecificCodes = await readJSONFile(
    path.resolve(__dirname, "./commonCodes/owgSportSpecificCodes.json")
  );
  const pwgSportsSpecificCodes = await readJSONFile(
    path.resolve(__dirname, "./commonCodes/pwgSportSpecificCodes.json")
  );

  const commonData = {
    competitionCode: payload["OdfBody"]["$"]["CompetitionCode"],
    documentCode: payload["OdfBody"]["$"]["DocumentCode"],
    owgSports,
    pwgSports,
    owgSportsSpecificCodes,
    pwgSportsSpecificCodes,
  };
  if (payload["OdfBody"]["Competition"][0]["Session"]) {
    events.OlympicsSession = generateSessionEvents(
      commonData,
      payload["OdfBody"]["Competition"][0]["Session"]
    );
  }
  if (payload["OdfBody"]["Competition"][0]["Unit"]) {
    events.OlympicsUnit = generateUnitEvents(
      commonData,
      payload["OdfBody"]["Competition"][0]["Unit"]
    );
  }
  return events;
}

async function readJSONFile(path) {
  const response = await fs.readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(response);
}

function getValueOfGender(unit) {
  try {
    return unit["StartList"][0]["Start"][0]["Competitor"][0]["Composition"][0][
      "Athlete"
    ][0]["Description"][0]["$"]["Gender"];
  } catch (error) {
    return undefined;
  }
}

function getSportType(commonData, eventCode) {
  let sportType;
  commonData.competitionCode === "OWG2022"
    ? commonData.owgSports.find((sport) => {
        if (eventCode.includes(sport.sportCode)) {
          sportType = sport.sport;
        }
      })
    : commonData.pwgSports.find((sport) => {
        if (eventCode.includes(sport.sportCode)) {
          sportType = sport.sport;
        }
      });
  return sportType;
}

function getEventStage(commonData, eventCode) {
  let eventStage;
  commonData.competitionCode === "OWG2022"
    ? commonData.owgSportsSpecificCodes.find((sport) => {
        if (eventCode.includes(sport.sport) && eventCode.includes(sport.code)) {
          eventStage = sport.code;
        }
      })
    : commonData.pwgSports.find((sport) => {
        if (eventCode.includes(sport.sport) && eventCode.includes(sport.code)) {
          eventStage = sport.code;
        }
      });
  return eventStage;
}

function generateSessionEvents(commonData, session) {
  const sessionEvents = [];
  session.forEach((session) => {
    const sessionEventBody = {
      publisherId: "d90972a3-65a5-447d-ae7b-084b8df9786d",
      clientEventId: session["$"]["SessionCode"],
      eventTypeCode: "OlympicsSession",
      eventBody: {
        code: session["$"]["SessionCode"],
        sessionName: session["SessionName"]
          ? session["SessionName"][0]["$"]["Value"]
          : undefined,
        medal: session["$"]["Medal"],
        startDate: session["$"]["StartDate"],
        endDate: session["$"]["EndDate"],
        sessionType: session["$"]["SessionType"],
        competition: {
          code: commonData.competitionCode,
          documentCode: commonData.documentCode,
        },
      },
      eventLocation: {
        venue: session["$"]["Venue"],
        venueName: session["$"]["VenueName"],
      },
      startDate: session["$"]["StartDate"],
      endDate: session["$"]["EndDate"],
    };
    sessionEvents.push(sessionEventBody);
  });
  return sessionEvents;
}

function generateUnitEvents(commonData, units) {
  const unitEvents = [];

  units.forEach((unit) => {
    const eventStage = getEventStage(commonData, unit["$"]["Code"])
    console.log(111,eventStage);
    const gender = getValueOfGender(unit);
    const sportType = getSportType(commonData, unit["$"]["Code"]);
    const unitEventBody = {
      publisherId: "d90972a3-65a5-447d-ae7b-084b8df9786d",
      clientEventId: unit["$"]["Code"],
      eventTypeCode: "OlympicsUnit",
      eventStatus: {
        name: unit["$"]["ScheduleStatus"],
      },
      eventBody: {
        code: unit["$"]["Code"],
        sportType,
        phaseType: unit["$"]["PhaseType"],
        eventName: "",
        medal: unit["$"]["Medal"],
        ItemName: unit["ItemName"]
          ? unit["ItemName"][0]["$"]["Value"]
          : undefined,
        sessionCode: unit["$"]["SessionCode"],
        startDate: unit["$"]["StartDate"],
        endDate: unit["$"]["EndDate"],
        eventStatus: {
          name: unit["$"]["ScheduleStatus"],
        },
        competition: {
          code: commonData.competitionCode,
          documentCode: commonData.documentCode,
        },
      },
      eventLocation: {
        venueName: unit["VenueDescription"]
          ? unit["VenueDescription"][0]["$"]["VenueName"]
          : undefined,
        locationName: unit["VenueDescription"]
          ? unit["VenueDescription"][0]["$"]["VenueName"]
          : undefined,
      },
      startDate: unit["$"]["StartDate"],
      endDate: unit["$"]["EndDate"],
    };
    if (gender) {
      unitEventBody.eventBody.gender = gender;
    }
    if (unit["$"]["ScheduleStatus"] === "RESCHEDULED") {
      unitEventBody.eventBody.endDate = unit["$"]["ActualEndDate"];
      unitEventBody.endDate = unit["$"]["ActualEndDate"];
    } else if (
      unit["$"]["ScheduleStatus"] !== "UNSCHEDULED" &&
      unit["$"]["ScheduleStatus"] !== "CANCELLED"
    ) {
      unitEventBody.eventBody.endDate = unit["$"]["EndDate"];
      unitEventBody.endDate = unit["$"]["EndDate"];
    }
    if (unit["$"]["ScheduleStatus"] === "RESCHEDULED") {
      unitEventBody.eventBody.startDate = unit["$"]["ActualStartDate"];
      unitEventBody.startDate = unit["$"]["ActualStartDate"];
    } else if (
      unit["$"]["ScheduleStatus"] !== "UNSCHEDULED" &&
      unit["$"]["ScheduleStatus"] !== "CANCELLED" &&
      unit["$"]["ScheduleStatus"] !== "POSTPONED"
    ) {
      unitEventBody.eventBody.startDate = unit["$"]["StartDate"];
      unitEventBody.startDate = unit["$"]["StartDate"];
    }
    unitEvents.push(unitEventBody);
  });
  return unitEvents;
}

let eventBody = eventsGenerator(xmlParsedBodyToJson);

eventBody.then((r) => {
  console.log(r.OlympicsSession);
});
