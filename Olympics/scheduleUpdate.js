let x = {
  OdfBody: {
    $: {
      DocumentCode: "FRS-------------------------------",
      DocumentType: "DT_SCHEDULE_UPDATE",
      Version: "42",
      Date: "2022-02-17",
      Time: "092521122",
      Source: "ZSPFRS2",
      LogicalDate: "2022-02-17",
      FeedFlag: "P",
      CompetitionCode: "OWG2022",
    },
    Competition: [
      {
        $: {
          Gen: "WOG-2022-GEN-2.6",
          Sport: "WOG-2022-FRS-1.4",
          Codes: "WOG-2022-3.5",
        },
        Session: [
          {
            $: {
              SessionCode: "SBD01",
              StartDate: "2022-03-06T11:00:00+08:00",
              EndDate: "2022-03-06T13:00:00+08:00",
              Venue: "ZSP",
              VenueName: "Zhangjiakou Genting Snow Park",
              SessionType: "MOR",
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
              SessionCode: "SBD02",
              StartDate: "2022-02-07T11:30:00+08:00",
              EndDate: "2022-02-07T14:30:00+08:00",
              Venue: "ZSP",
              VenueName: "Zhangjiakou Genting Snow Park",
              SessionType: "MOR",
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
              SessionCode: "SBD03",
              StartDate: "2022-03-12T12:00:00+08:00",
              EndDate: "2022-03-12T15:00:00+08:00",
              Venue: "ZSP",
              VenueName: "Zhangjiakou Genting Snow Park",
              SessionType: "EAF",
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
              Code: "FRSWHP----------------QUAL--------",
              PhaseType: "3",
              ScheduleStatus: "GETTING_READY",
              StartDate: "2022-02-17T09:30:00+08:00",
              EndDate: "2022-02-17T11:10:00+08:00",
              HideEndDate: "Y",
              Venue: "ZSP",
              Location: "GHS",
              SessionCode: "FRS16",
              ModificationIndicator: "U",
            },
            ItemName: [
              {
                $: {
                  Language: "ENG",
                  Value: "Qualification",
                },
              },
            ],
            VenueDescription: [
              {
                $: {
                  VenueName: "Genting Snow Park",
                  LocationName: "Genting Snow Park - SS & HP",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
