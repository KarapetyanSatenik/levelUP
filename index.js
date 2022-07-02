// This file will have to do the following:
// 1. Massage event data (parse XML and turn into JSON)
// 2. Send massaged data to Event Ingestion SQS

"use strict";

const LAP = require("@tr/lap_javascript_sdk");
const log = new LAP.Logger("helper");
const { ingestEvents } = require("./sqs-handler");
const { scheduleParser } = require("./schedule-parser");

async function handleSqsRecords(payload) {
  try {
    log.info(payload);
    const map = {};
    // Parse schedule file from xml to json with eventTypeCode and events so that we can ingest, content sub, and slug
    const parsedRecord = await scheduleParser(payload);
    const { eventTypeCode, events } = parsedRecord;
    if (!map.hasOwnProperty(eventTypeCode)) {
      map[eventTypeCode] = [];
    }
    map[eventTypeCode].push(...events);

    const history = [];
    for (const eventTypeCode of Object.keys(map)) {
      log.info("Dropping events to the Event Calender Service ingestion queue");
      const summary = await ingestEvents(map[eventTypeCode]);
      history.push(...summary);
    }
    return history;
  } catch (error) {
    log.error({ err: error.stack }, "Failed to process records");
  }
}

module.exports = {
  handleSqsRecords,
};