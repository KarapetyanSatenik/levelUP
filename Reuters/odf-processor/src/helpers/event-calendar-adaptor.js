'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const LAP = require('@tr/lap_javascript_sdk');
const log = new LAP.Logger('event-calendar-adaptor');
const eventQueue = process.env.EVENT_CALENDAR_SERVICE_INGEST_QUEUE;
const ingestionBatchSize = Number(process.env.INGESTION_BATCH_SIZE || 10);

exports.ingestEvents = ingestEvents;

async function ingestEvents(events) {
  const history = [];
  for (let i = 0; i < events.length; i += ingestionBatchSize) {
    const payload = [...events].slice(i, i + ingestionBatchSize);
    const completionPercentage = (i * 100 / events.length).toFixed(2);
    log.info({
      completionPercentage: `${completionPercentage}%`,
      remainingEventCount: events.length - i
    });

    const response = await sqs.sendMessage({
      QueueUrl: eventQueue,
      MessageBody: JSON.stringify({ events: payload })
    }).promise();

    history.push({
      messageId: response.MessageId,
      batchSize: payload.length,
      eventIds: payload.map(event => event.clientEventId)
    });
  }

  return history;
}