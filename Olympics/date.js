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
              SessionCode: "PCO987",
              StartDate: "2022-02-06T20:05:00+08:00",
              EndDate: "2022-03-06T22:05:00+08:00",
              Leadin: "0:00",
              Venue: "USA",
              VenueName: "National Indoor Stadium",
              SessionType: "EVE",
              Medal: "Y",
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
              SessionCode: "OLV988",
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
              Code: "CURXTEAM4---00000-----PREL000100--",
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
        ],
      },
    ],
  },
};

const fs = require('fs');
const path = require('path');

async function eventsGenerator(payload) {
  const events = {};
  const sports = await readJSONFile(
    path.resolve(__dirname, './commonCodes/sports.json')
  );
  const sportsSpecificCodes = await readJSONFile(
    path.resolve(__dirname, './commonCodes/sportSpecificCodes.json')
  );
  const gender = await readJSONFile(
    path.resolve(__dirname, './commonCodes/sportGenders.json')
  );

  const commonData = {
    competitionCode: payload['OdfBody']['$']['CompetitionCode'],
    documentCode: payload['OdfBody']['$']['DocumentCode'],
    sports,
    gender,
    sportsSpecificCodes,
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
  commonData.sports.find((sport) => {
    if (sportCodeId === sport.sportCode) sportType = sport.sport;
  });
  return sportType;
}

function getEventStage(commonData, stageId) {
  let eventStage;
  commonData.sportsSpecificCodes.find((sport) => {
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
        sportType: sportType,
        SessionName: session['SessionName']
          ? session['SessionName'][0]['$']['Value']
          : undefined,
        Medal: session['$']['Medal'],
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
        sportType: sportType,
        gender: gender,
        phaseType: unit['$']['PhaseType'],
        eventName: undefined,
        eventStage: eventStage,
        medal: unit['$']['Medal'],
        itemName: unit['ItemName']
          ? unit['ItemName'][0]['$']['Value']
          : undefined,
        sessionCode: unit['$']['SessionCode'],
        startDateTime: unit['$']['StartDate'],
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
    if (unit['ItemName'] && eventStage) {
      unitEventBody.eventBody.eventName =
      `${sportType} - ${unit['ItemName'][0]['$']['Value']} - ${eventStage}`;
    }
    unitEvents.push(unitEventBody);
  });
  return unitEvents;
}

let eventBody = eventsGenerator(xmlParsedBodyToJson);

eventBody.then((r) => {
  // console.log(r.OlympicsSession);
  console.log(r.OlympicsUnit);
});
