'use strict';

const LAP = require('@tr/lap_javascript_sdk');
const fetch = require('node-fetch');

let log = new LAP.Logger('content-mapping-adaptor');
exports.getTransformedEvents = getTransformedEvents;

async function getTransformedEvents(eventType, payload) {
  log.debug('Retrieving transformed events from Content Mapping Service now.');
  log.debug({ eventType, payload });

  const redisClient = LAP.ConfigClient.getInstance();
  const env = process.env;
  const sphinxToken = await redisClient.get(env['SPHINX_AUTH_TOKEN_PATH']);
  const contentMappingUrl = `${env['CONTENT_MAPPING_SERVICE_URL']}/batch`;
  const contentMappingApiKey = env['CONTENT_MAPPING_SERVICE_API_KEY'];

  const headers = {
    Authorization: `Bearer ${sphinxToken}`,
    'x-api-key': contentMappingApiKey,
    'Content-Type': 'application/json',
  };

  const payloadJson = {
    type: `stats/events/${eventType}`,
    payload,
  };
  log.info(payloadJson);
  const response = await fetch(contentMappingUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payloadJson),
  });
  log.info(response);
  const respJson = await response.json();
  log.info(respJson);
  log.debug(respJson);
  return respJson;
}