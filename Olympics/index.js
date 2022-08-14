
let payload = {
  OdfBody: {
    $: {
      CompetitionCode: "OWG2022",
      DocumentCode: "CER-------------------------------",
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
      phaseType: 'Competition',
      eventName: "",
      sessionCode: "",
      startDateTime: "",
      eventStatus: {
        name: unit['$']['ScheduleStatus'],
      },
      competition: {
        competitionCode: "",
        documentCode: "",
      },
    },
    eventLocation: {
      venueName: "",
      LocationName: "",
    },
    startDate: "",
    endDate: "",
    updateDate: "",
  };

  let session = {
    publisherId: 'd90972a3-65a5-447d-ae7b-084b8df9786d',
    clientEventId: "",
    eventTypeCode: 'OlympicsSession',
    eventBody: {
      code: "",
      sportType: "",
      SessionName: "",
      startDate: "",
      endDate: "",
      competition: {
        competitionCode: "",
        documentCode: "",
      },
    },
    eventLocation: {
      venue: "",
      VenueName: "",
    },
    startDate: "",
    endDate: "",
    updateDate: "",
  }
