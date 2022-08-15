
let payload = {
  OdfBody: {
    $: {
      CompetitionCode: "OWG2022-HT", //UNIQUE ID FOR COMPETITION
      DocumentCode: "CER-------------------------------", 
      DocumentType: "DT_SCHEDULE_UPDATE",
      Version: "2688",
      Language: "ENG",
      FeedFlag: "P", //T- test message or P- production message
      Date: "2022-02-17",
      Time: "084527763",
      LogicalDate: "2022-02-17",
      Source: "ODS",
    },
    Competition: [
      {
        $: {
          Gen: "SOG-2020-1.10",
          Sport:"SOG-2020-DDD-1.10",
          Codes: "SOG-2020-1.20",
        },
        Unit: [
          {
            $: {
              Code: "TRU-IHO-------------------3D------",
              PhaseType: "2",
              UnitNum:"",
              ScheduleStatus: "SCHEDULED",
              StartDate: "2022-02-17T12:00:00+08:00",
              HideStartDate: "N",
              EndDate: "2022-02-17T13:00:00+08:00",
              HideEndDate: "N",
              ActualStartDate:"",
              ActualEndDate:"",
              Order:"",
              Medal:"",
              Venue: "NIS",
              Location: "NIS",
              MediaAccess: "OPE",
              SessionCode:"",
              ModificationIndicator: "U",
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
             StartList: [],
          },
        ],
      },
    ],
  },
};


let unit = {
    publisherId: 'd90972a3-65a5-447d-ae7b-084b8df9786d',
    clientEventId: "",
    eventTypeCode: 'OlympicsUnit',
    eventStatus: {
      name: unit['$']['ScheduleStatus'],
    },
    eventBody: {
      code: unit['$']['Code'],
      sportType: "",
      phaseType:unit['$']['PhaseType'],
      eventName: "",
      sessionCode: unit['$']['SessionCode'],
      startDate: unit['$']['StartDate'],
      eventStatus: {
        name: unit['$']['ScheduleStatus'],
      },
      competition: {
        competitionCode: competitionCode,
        documentCode: payload['OdfBody']['$']['DocumentCode'],
      },
    },
    eventLocation: {
      venueName: unit['VenueDescription'][0]['$']['VenueName'],
      locationName: "",
    },
    startDate: unit['$']['StartDate'],
    endDate: unit['$']['EndDate'],
    updateDate: "",
  };

  let session = {
    publisherId: 'd90972a3-65a5-447d-ae7b-084b8df9786d',
    clientEventId: "",
    eventTypeCode: 'OlympicsSession',
    eventBody: {
      code: "",
      sportType: "",
      SessionName: session['SessionName'][0]['$']['Value'],
      startDate: session['$']['StartDate'],
      endDate: session['$']['EndDate'],
      competition: {
        competitionCode: competitionCode,
        documentCode: payload['OdfBody']['$']['DocumentCode'],
      },
    },
    eventLocation: {
      venue: session['$']['Venue'],
      venueName: session['$']['VenueName'],
    },
    startDate: session['$']['StartDate'],
    endDate: session['$']['EndDate'],
    updateDate: "",
  }
