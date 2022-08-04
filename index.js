
let eventCalendarBody = {
    eventTypeCode: "OWG2022",
    events: [
      {
        publisherId: "testPublisherId",
        clientEventId: "140756822231",
        eventTypeCode: "CorporateEarnings",
        eventStatus: {
          name: "InProgress",
          testField: "testField",
        },
        eventBody: {
          briefAvailable: "true",
          presentationAvailable: "true",
          transcriptAvailable: "false",
          guidanceAvailable: "false",
          mediaAvailable: "false",
          EventData: {
            Derived: {
              OrganizationPrimaryRIC: ["CSCO.OQ"],
              EventDate: "2020-02-27T11:47:04+0000",
              LastUpdatedAt: "2020-02-27T12:36:02+0000",
              EventEndDate: "2020-02-28T11:47:04+0000",
              OrganizationID: ["5037613143"],
            },
            Event: {
              DistinguishingEventName: "Q3 2019 Cisco Inc Earnings Release",
            },
            id: "140756811131",
          },
        },
        eventLocation: {
          country: "Canada",
          city: "Toronto",
        },
        eventSlug: "TEST-SLUG",
        startDate: "2020-02-28T13:30:00Z",
        endDate: "2020-02-28T13:30:00Z",
      },
    ],
  };
  
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
                SessionCode:"BOB05"
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
  

  const missingProperties = {
    eventTypeCode: "OWG2022",
    events: [
      {
        publisherId: undefined,
        clientEventId: "140756822231",
        eventTypeCode: "CorporateEarnings",
        eventStatus: {
          name: undefined,
          testField: undefined,
        },
        eventBody: {
          briefAvailable: undefined,
          presentationAvailable: undefined,
          transcriptAvailable: undefined,
          guidanceAvailable: undefined,
          mediaAvailable: undefined,
          EventData: {
            Derived: {
              OrganizationPrimaryRIC: undefined,
              EventDate: "2020-02-27T11:47:04+0000",
              LastUpdatedAt: "2020-02-27T12:36:02+0000",
              EventEndDate: "2020-02-28T11:47:04+0000",
              OrganizationID: undefined,
            },
            Event: {
              DistinguishingEventName: "Q3 2019 Cisco Inc Earnings Release",
            },
            id: undefined,
          },
        },
        eventLocation: {
          country: undefined,
          city: undefined,
        },
        eventSlug: "TEST-SLUG",
        startDate: "2020-02-28T13:30:00Z",
        endDate: "2020-02-28T13:30:00Z",
      },
    ],
  };