'use strict';

const fs = require('fs');
const path = require('path');

async function eventsGenerator(payload) {
  const events = {};
  const sports = await readJSONFile(
    path.resolve(__dirname, '../commonCodes/sports.json')
  );
  const sportsSpecificCodes = await readJSONFile(
    path.resolve(__dirname, '../commonCodes/sportSpecificCodes.json')
  );
  const gender = await readJSONFile(
    path.resolve(__dirname, '../commonCodes/sportGenders.json')
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

module.exports = {
  eventsGenerator,
};
