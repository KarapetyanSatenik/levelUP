let xmlParsedBodyToJson = {
  OdfBody: {
    $: {
      CompetitionCode: "OWG2022",
      DocumentCode: "TRU-------------------------------",
      DocumentType: "DT_SCHEDULE_UPDATE",
      Version: "2688",
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
              SessionCode: "PBTH01",
              StartDate: "2022-03-05T10:00:00+08:00",
              EndDate: "2022-03-05T15:05:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Session 1",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "PBTH02",
              StartDate: "2022-03-08T10:00:00+08:00",
              EndDate: "2022-03-08T15:25:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Session 2",
                },
              },
            ],
          },
          {
            $: {
              SessionCode: "PBTH03",
              StartDate: "2022-03-11T10:00:00+08:00",
              EndDate: "2022-03-11T15:20:00+08:00",
              Venue: "ZBT",
              VenueName: "Zhangjiakou National Biathlon Centre",
              Medal: "Y",
            },
            SessionName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Session 3",
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
              ScheduleStatus: "UNSCHEDULED",
              ActualStartDate: "2006+01:00",
              ActualEndDate: "2006+01:00",
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

("use strict");

function eventsGenerator(payload) {
  const today = new Date();
  const events = {
    OlympicsSession: [],
    OlympicsUnit: [],
  };

  const competitionCode = payload["OdfBody"]["$"]["CompetitionCode"];
  if (payload["OdfBody"]["Competition"][0]["Session"]) {
    payload["OdfBody"]["Competition"][0]["Session"].forEach((session) => {
      sessionBody = {
        publisherId: "d90972a3-65a5-447d-ae7b-084b8df9786d",
        clientEventId: session["$"]["SessionCode"],
        eventTypeCode: "OlympicsSession",
        eventBody: {
          code: session["$"]["SessionCode"],
          sessionName: session["SessionName"]
            ? session["SessionName"][0]["$"]["Value"]
            : undefined,
          startDate: session["$"]["StartDate"],
          endDate: session["$"]["EndDate"],
          sessionType: session["$"]["SessionType"],
          competition: {
            code: competitionCode,
            documentCode: payload["OdfBody"]["$"]["DocumentCode"],
          },
        },
        eventLocation: {
          venue: session["$"]["Venue"],
          venueName: session["$"]["VenueName"],
        },
        startDate: session["$"]["StartDate"],
        endDate: session["$"]["EndDate"],
        updateDate: today,
      };
    });
    // events.OlympicsSession.push(sessionBody);
  }
  if (payload["OdfBody"]["Competition"][0]["Unit"]) {
    payload["OdfBody"]["Competition"][0]["Unit"].forEach((unit) => {
      unitBody = {
        publisherId: "d90972a3-65a5-447d-ae7b-084b8df9786d",
        clientEventId: unit["$"]["Code"],
        eventTypeCode: "OlympicsUnit",
        eventStatus: {
          name: unit["$"]["ScheduleStatus"],
        },
        eventBody: {
            code: unit["$"]["Code"],
            phaseType: unit["$"]["PhaseType"],
            eventName: unit["ItemName"]
              ? unit["ItemName"][0]["$"]["Value"]
              : undefined,
            sessionCode: unit["$"]["SessionCode"],
            startDate: unit["$"]["StartDate"],
            endDate: unit["$"]["EndDate"],
            eventStatus: {
              name: unit["$"]["ScheduleStatus"],
            },
            competition: {
              code: competitionCode,
              documentCode: payload["OdfBody"]["$"]["DocumentCode"],
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
        updateDate: today,
      };
      if (unit["$"]["ScheduleStatus"] === "RESCHEDULED") {
        unitBody.eventBody.endDate = unit["$"]["ActualEndDate"];
        unitBody.endDate = unit["$"]["ActualEndDate"];
      }
     else if (
        unit["$"]["ScheduleStatus"] !== "UNSCHEDULED" &&
        unit["$"]["ScheduleStatus"] !== "CANCELLED"
      ) {
        unitBody.eventBody.endDate = unit["$"]["EndDate"];
        unitBody.endDate = unit["$"]["EndDate"];
      }
      if (unit["$"]["ScheduleStatus"] === "RESCHEDULED") {
        unitBody.eventBody.startDate = unit["$"]["ActualStartDate"];
        unitBody.startDate = unit["$"]["ActualStartDate"];
      } else if (
        unit["$"]["ScheduleStatus"] !== "UNSCHEDULED" &&
        unit["$"]["ScheduleStatus"] !== "CANCELLED" &&
        unit["$"]["ScheduleStatus"] !== "POSTPONED"
      ) {
        unitBody.eventBody.startDate = unit["$"]["StartDate"];
        unitBody.startDate = unit["$"]["StartDate"];
      }
    });

    events.OlympicsUnit.push(unitBody);
  }
  return events;
}

// console.log(eventsGenerator(xmlParsedBodyToJson));

let eventBody = eventsGenerator(xmlParsedBodyToJson);
console.log(eventBody.OlympicsSession);
console.log(eventBody.OlympicsUnit);
