'use strict';

const LAP = require('@tr/lap_javascript_sdk');
const fetch = require('node-fetch');
let log = new LAP.Logger('slug-adaptor');

exports.getSlugs = getSlugs;

async function getSlugs(eventType, payload) {
  log.debug('Retrieving slugs from the slugging service now.');
  log.debug({ eventType, payload });

  const slugUrl = `${process.env['SLUGGING_SERVICE_URL']}/batch`;
  const slugApiKey = process.env['SLUGGING_SERVICE_API_KEY'];
  const redisClient = LAP.ConfigClient.getInstance();
  let sphinxToken =
    await redisClient.get(process.env['SPHINX_AUTH_TOKEN_PATH']);
  var apiHeaders = {
    Authorization: `Bearer ${sphinxToken}`,
    'x-api-key': slugApiKey,
    'Content-Type': 'application/json'
  };
  let slugPayload = {
    type: `stats/events/${eventType}`,
    payload
  };
  log.info(slugPayload);
  const apiResponse = await fetch(slugUrl,
    { method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(slugPayload)
    });
  log.info(apiResponse);

  const data = await apiResponse.json();
  log.info(data);
  log.debug(data);
  return data;
}