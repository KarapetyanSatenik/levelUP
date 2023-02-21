'use strict';

const LAP = require('@tr/lap_javascript_sdk');
const log = new LAP.Logger('helper');
const { getTransformedEvents } = require('./content-mapping-adapter');
const { getSlugs } = require('./slug-adaptor');
const { ingestEvents } = require('./event-calendar-adaptor');
const requestBatchSize = Number(process.env.API_REQUEST_BATCH_SIZE || 10);
const { eventsGenerator } = require('./events-generator');

async function handleSqsRecords(payload) {
  log.info('json payload', payload);
  const events = await eventsGenerator(payload);
  const history = [];
  for (const eventTypeCode of Object.keys(events)) {
    const summary = await processEvents(eventTypeCode, events[eventTypeCode]);
    history.push(...summary);
  }
  return history;
}

async function processEvents(eventTypeCode, events) {
  log.info({ eventTypeCode, eventCount: events.length });
  log.info('Sending requests to content mapping and slugging service.');
  for (let i = 0; i < events.length; i += requestBatchSize) {
    const payload = [...events].slice(i, i + requestBatchSize);
    const completionPercentage = (i * 100 / events.length).toFixed(2);
    log.info({
      completionPercentage: `${completionPercentage}%`,
      unprocessedEventCount: events.length - i
    });
    const cmResponse = await getTransformedEvents(eventTypeCode, payload);
    if (cmResponse.status !== 'ok') {
      log.warn({ cmResponse },
        'Error occurred while retrieving transformed event');
    } else {
      if (cmResponse.results.rejectionsOccurred) {
        const ignoredEventIds = cmResponse
          .results
          .erroredEventsByIndex
          .map(k => payload[k].clientEventId);
        log.warn({ ignoredEventIds },
          'Failed to transform the events to use Reuters-compliant codes.');
      }
      const transformedEvents = cmResponse
        .results
        .successfulEventsByIndex
        .map(k => cmResponse.results.data[k]);
      const slugResponse =
        await getSlugs(eventTypeCode, transformedEvents);
      if (slugResponse !== null && slugResponse.status === 'ok') {
        for (let j = i, l = 0;
          j < events.length && j < i + requestBatchSize; ++j) {
          if (cmResponse.results.successfulEventsByIndex.includes(j - i)){
            if (typeof slugResponse.results.data[l] === 'string'){
              log.debug(`Adding slug: ${slugResponse.results.data[l]} ` +
              `to event ${events[j].clientEventId}`);
              events[j].eventSlug = slugResponse.results.data[l];
            } else {
              log.warn(slugResponse.results.data[l],
                'Error occurred while retrieving slug for this event');
            }
            l++;
          }
        }
      }
    }
  }

  log.info('Dropping events to the Event Calender Service ingestion queue');
  return await ingestEvents(events);
}

module.exports = {
  handleSqsRecords
};