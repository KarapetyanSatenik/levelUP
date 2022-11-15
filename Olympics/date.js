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
              Code: "TRU-IHO-------------------3D------",
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
    path.resolve(__dirname, './commonCodes/owgSports.json')
  );
  const pwgSports = await readJSONFile(
    path.resolve(__dirname, './commonCodes/pwgSports.json')
  );
  const owgSportsSpecificCodes = await readJSONFile(
    path.resolve(__dirname, './commonCodes/sportSpecificCodes.json')
  );
  const gender = await readJSONFile(
    path.resolve(__dirname, './commonCodes/sportGenders.json')
  );

  const commonData = {
    competitionCode: payload['OdfBody']['$']['CompetitionCode'],
    documentCode: payload['OdfBody']['$']['DocumentCode'],
    owgSports,
    pwgSports,
    gender,
    owgSportsSpecificCodes,
  };
  if (payload['OdfBody']['Competition'][0]['Session']) {
    events.OlympicsSession = generateSessionEvents(
      commonData,
      payload['OdfBody']['Competition'][0]['Session']
    );
  }
  if (payload['OdfBody']['Competition'][0]['Unit']) {
    events.OlympicsUnit = generateUnitEvents(
      commonData,
      payload['OdfBody']['Competition'][0]['Unit']
    );
  }
  return events;
}

async function readJSONFile(path) {
  const response = await fs.readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(response);
}

function getValueOfGender(commonData, genderId) {
  let gender;
  commonData.gender.find((item) => {
    if (genderId === item.id) gender = item.gender;
  });
  return gender;
}

function getSportType(commonData, sportCodeId) {
  let sportType;
  commonData.competitionCode === 'OWG2022'
    ? commonData.owgSports.find((sport) => {
      if (sportCodeId === sport.sportCode) sportType = sport.sport;
    })
    : commonData.pwgSports.find((sport) => {
      if (sportCodeId === sport.sportCode) sportType = sport.sport;
    });

  return sportType;
}

function getEventStage(commonData, stageId) {
  let eventStage;
  commonData.owgSportsSpecificCodes.find((sport) => {
    if (stageId === sport.code) eventStage = sport.description;
  });
  return eventStage;
}

function generateSessionEvents(commonData, session) {
  const sessionEvents = [];
  session.forEach((session) => {
    const sportType = getSportType(
      commonData,
      session['$']['SessionCode'].substr(0, 3)
    );
    const sessionEventBody = {
      publisherId: 'd90972a3-65a5-447d-ae7b-084b8df9786d',
      clientEventId: session['$']['SessionCode'],
      eventTypeCode: 'OlympicsSession',
      eventBody: {
        code: session['$']['SessionCode'],
        SessionName: session['SessionName']
          ? session['SessionName'][0]['$']['Value']
          : undefined,
        startDateTime: session['$']['StartDate'],
        endDate: session['$']['EndDate'],
        SessionType: session['$']['SessionType'],
        competition: {
          code: commonData.competitionCode,
          documentCode: commonData.documentCode,
        },
      },
      eventLocation: {
        venue: session['$']['Venue'],
        VenueName: session['$']['VenueName'],
      },
      startDate: session['$']['StartDate'],
      endDate: session['$']['EndDate'],
    };
    if (sportType) {
      sessionEventBody.eventBody.sportType = sportType;
    }
    if (session['$']['Medal']) {
      sessionEventBody.eventBody.Medal = session['$']['Medal'];
    }
    sessionEvents.push(sessionEventBody);
  });
  return sessionEvents;
}

function generateUnitEvents(commonData, units) {
  const unitEvents = [];

  units.forEach((unit) => {
    const eventStage = getEventStage(
      commonData,
      unit['$']['Code'].substr(22, 4)
    );
    const sportType = getSportType(commonData, unit['$']['Code'].substr(0, 3));
    const gender = getValueOfGender(commonData, unit['$']['Code'][3]);

    const unitEventBody = {
      publisherId: 'd90972a3-65a5-447d-ae7b-084b8df9786d',
      clientEventId: unit['$']['Code'],
      eventTypeCode: 'OlympicsUnit',
      eventStatus: {
        name: unit['$']['ScheduleStatus'],
      },
      eventBody: {
        code: unit['$']['Code'],
        phaseType: unit['$']['PhaseType'],
        sessionCode: unit['$']['SessionCode'],
        eventStatus: {
          name: unit['$']['ScheduleStatus'],
        },
        competition: {
          code: commonData.competitionCode,
          documentCode: commonData.documentCode,
        },
      },
      eventLocation: {
        VenueName: unit['VenueDescription']
          ? unit['VenueDescription'][0]['$']['VenueName']
          : undefined,
        LocationName: unit['VenueDescription']
          ? unit['VenueDescription'][0]['$']['VenueName']
          : undefined,
      },
      startDate: unit['$']['StartDate'],
      endDate: unit['$']['EndDate'],
    };
    if (gender) {
      unitEventBody.eventBody.gender = gender;
    }
    if (eventStage) {
      unitEventBody.eventBody.eventStage = eventStage;
    }
    if (sportType) {
      unitEventBody.eventBody.sportType = sportType;
    }
    if (unit['$']['Medal']) {
      unitEventBody.eventBody.medal = unit['$']['Medal'];
    }
    if (unit['ItemName']) {
      unitEventBody.eventBody.itemName = unit['ItemName'][0]['$']['Value'];
    }
    if (unit['ItemName'] && eventStage) {
      unitEventBody.eventBody.eventName =
      `${unit['ItemName'][0]['$']['Value']} - ${eventStage}`;
    }
    if (
      unit['$']['ScheduleStatus'] !== 'UNSCHEDULED' &&
      unit['$']['ScheduleStatus'] !== 'CANCELLED'
    ) {
      unitEventBody.eventBody.endDate = unit['$']['EndDate'];
    }
   if (
      unit['$']['ScheduleStatus'] !== 'UNSCHEDULED' &&
      unit['$']['ScheduleStatus'] !== 'CANCELLED' &&
      unit['$']['ScheduleStatus'] !== 'POSTPONED'
    ) {
      unitEventBody.eventBody.startDateTime = unit['$']['StartDate'];
    }
    unitEvents.push(unitEventBody);
  });
  return unitEvents;
}
let eventBody = eventsGenerator(xmlParsedBodyToJson);

eventBody.then((r) => {
  console.log(r.OlympicsSession);
});
