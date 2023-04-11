'use strict';

const fs = require('fs');
const path = require('path');
const dateTimeForEvents = require('../common/constants/dateTime');

async function eventsGenerator(payload) {
  const events = {};
  const sports = await readJSONFile(
    path.resolve(__dirname, '../common/sportCodes/sportTypes.json')
  );
  const sportsSpecificCodes = await readJSONFile(
    path.resolve(__dirname, '../common/sportCodes/sportSpecificCodes.json')
  );
  const gender = await readJSONFile(
    path.resolve(__dirname, '../common/sportCodes/sportGenders.json')
  );
  const sessionType = await readJSONFile(
    path.resolve(__dirname, '../common/sportCodes/sessionType.json')
  );

  const commonData = {
    competitionCode: payload['OdfBody']['$']['CompetitionCode'],
    documentCode: payload['OdfBody']['$']['DocumentCode'],
    sports,
    gender,
    sportsSpecificCodes,
    sessionType,
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

function getEventStage(commonData, sportType, stageId, gender) {
  let eventStage;
  commonData.sportsSpecificCodes.find((sport) => {
    if (
      stageId === sport.code &&
      sportType === sport.sport &&
      gender === sport.gender
    )
      eventStage = sport.description;
  });
  return eventStage;
}

function getSessionType(commonData, typeId) {
  let sessionType;
  commonData.sessionType.find((session) => {
    if (typeId === session.id) sessionType = session.description;
  });
  return sessionType;
}

const getItemName = (arr) =>
  arr.find((el) => el['$']['Language'] === 'ENG')['$']['Value'];

  const generateEventSlug = (eventTypeCode, sportType, { eventBody }) => {
    let competitionCode = eventBody.competition.code;
    const year = competitionCode.slice(2, 6);
    const competitionType = competitionCode.startsWith('PG') ? 'PARALYMPICS' : 'OLYMPICS'
    if (eventTypeCode === 'OlympicsUnit') {
      return `${competitionType}-${year}-${sportType}/${eventBody.itemName}-${
        eventBody.phaseType
      }`.toUpperCase();
    } else {
      return `${competitionType}-${year}-${sportType}`.toUpperCase();
    }
  };

function generateSessionEvents(commonData, session) {
  return session.map((session) => {
    const sportType = getSportType(
      commonData,
      session['$']['SessionCode'].substr(0, 3)
    );
    const sessionType = getSessionType(commonData, session['$']['SessionType']);
    const sessionEventBody = {
      publisherId: 'd90972a3-65a5-447d-ae7b-084b8df9786d',
      clientEventId: session['$']['SessionCode'],
      eventTypeCode: 'OlympicsSession',
      eventBody: {
        code: session['$']['SessionCode'],
        sportType: sportType,
        SessionName: session['SessionName'][0]['$']['Value'],
        Medal: session['$']['Medal'],
        startDateTime: session['$']['StartDate'],
        endDate: session['$']['EndDate'],
        SessionType: sessionType,
        competition: {
          code: commonData.competitionCode,
          documentCode: commonData.documentCode,
        },
      },
      eventLocation: {
        Venue: session['$']['Venue'],
        VenueName: session['$']['VenueName'],
      },
      startDate: session['$']['StartDate'],
      endDate: session['$']['EndDate'],
    };
    sessionEventBody.eventSlug = generateEventSlug(
      'OlympicsSession',
      sportType,
      sessionEventBody
    );
    return sessionEventBody;
  });
}

function generateUnitEvents(commonData, units) {
  return units.map((unit) => {
    const sportType = getSportType(commonData, unit['$']['Code'].substr(0, 3));
    const gender = getValueOfGender(commonData, unit['$']['Code'][3]);
    const eventStage = getEventStage(
      commonData,
      unit['$']['Code'].substr(0, 3),
      unit['$']['Code'].substr(22, 4),
      unit['$']['Code'][3]
    );
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
        eventName: `${sportType} - ${getItemName(unit['ItemName'])}`,
        eventStage: eventStage,
        medal: unit['$']['Medal'],
        itemName: getItemName(unit['ItemName']),
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
        VenueName: unit['VenueDescription'][0]['$']['VenueName'],
        LocationName: unit['VenueDescription'][0]['$']['VenueName'],
      },
      startDate: unit['$']['StartDate'],
      endDate: unit['$']['EndDate'],
    };

    unitEventBody.eventSlug = generateEventSlug('OlympicsUnit', sportType, unitEventBody);

    if (
      unit['$']['ScheduleStatus'] === 'UNSCHEDULED'
    ) {
      unitEventBody.startDate = dateTimeForEvents.startDate;
      unitEventBody.endDate = dateTimeForEvents.endDate;
    }
    if (unit['$']['HideStartDate']) {
      unitEventBody.eventBody.hideStartDate = unit['$']['HideStartDate'];
    }
    if (unit['$']['HideEndDate']) {
      unitEventBody.eventBody.hideEndDate = unit['$']['HideEndDate'];
    }

    return unitEventBody;
  });
}


let xmlParsedBodyToJson = {
  OdfBody: {
    $: {
      CompetitionCode: "OG2024",
      DocumentCode: "GAR-------------------------------",
      DocumentType: "DT_SCHEDULE_UPDATE",
      Version: "3",
      Language: "ENG",
      FeedFlag: "P",
      Date: "2022-02-17",
      Time: "084527763",
      LogicalDate: "2022-02-17",
      Source: "ODS",
    },
    Competition: [
      {
        $: {
          Gen: "WOG-2022-GEN",
          Codes: "WOG-2022-3.10",
        },
        Session: [
          {
            $: {
              SessionCode: "ARC01",
              StartDate: "2022-03-05T10:00:00+08:00",
              EndDate: "2022-03-05T15:05:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
              SessionType: "MOR",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Athletics Session 1",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "ARC01",
              StartDate: "2022-03-05T10:00:00+08:00",
              EndDate: "2022-03-05T15:05:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
              SessionType: "MOR",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Athletics Session 1",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "ARC01",
              StartDate: "2022-03-05T10:00:00+08:00",
              EndDate: "2022-03-05T15:05:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
              SessionType: "MOR",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Athletics Session 1",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "GAR02",
              StartDate: "2022-03-08T10:00:00+08:00",
              EndDate: "2022-03-08T15:25:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
              SessionType: "AFT",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Athletics Session 2",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "ATH03",
              StartDate: "2022-03-11T10:00:00+08:00",
              EndDate: "2022-03-11T15:20:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
              SessionType: "EAF",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Athletics Session 3",
                },
              },
            ],
          },
        ],
        Unit: [
          {
            $: {
              Code: "GARM1APPH-------------FNL-000001--",
              PhaseType: "3",
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
                  Value: "Men's Pommel Horse Final",
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
              Code: "GAR-------------------MEET000001--",
              PhaseType: "2",
              ScheduleStatus: "SCHEDULED",
              StartDate: "2022-02-17T12:00:00+08:00",
              HideStartDate: "Y",
              EndDate: "2022-02-17T13:00:00+08:00",
              HideEndDate: "N",
              Venue: "NIS",
              Location: "NIS",
              MediaAccess: "OPE",
              ModificationIndicator: "U",
              SessionCode: "BOB05",
              Medal: 3,
            },
            ItemName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Artistic Gymnastics - Orientation Meeting",
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
eventsGenerator(xmlParsedBodyToJson).then((res) => {
  console.log("SESSION", res.OlympicsUnit);
});

module.exports = {
  eventsGenerator,
};
