'use strict';

const LAP = require('@tr/lap_javascript_sdk');
const { S3, GetObjectCommand } = require('@aws-sdk/client-s3');
const xml2js = require('xml2js');
const log = new LAP.Logger('index');
const helper = require('./helpers/helper');
 
const odfBucket = process.env.ODF_BUCKET;
const currentEnvironment = process.env.CURRENT_ENVIRONMENT;
const s3 = new S3({ region: process.env.REGION });

async function streamToString(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

function testProcessing() {
  const workingEnvironments = {
    ci: true,
    test: true,
    uat: false,
    prod: false,
  };
  return !workingEnvironments[currentEnvironment];
}

exports.handler = async(event, context) => {
  log.info({ event, context });
  try {
    const pathToS3 = event['Records'][0]['body'];
    const getXmlFromS3 = await s3.send(
      new GetObjectCommand({
        Bucket: odfBucket,
        Key: pathToS3,
      })
    );
    const xmlBody = await streamToString(getXmlFromS3.Body);
    const parseXmlToJson = await xml2js.parseStringPromise(xmlBody);

    log.info('environment name', currentEnvironment);
    const typeofMessage = parseXmlToJson['OdfBody']['$']['FeedFlag'];
    if (typeofMessage === 'T' && testProcessing()){
      return 'Type of message doesn\'t match for this environment';
    }

    const history = await helper.handleSqsRecords(parseXmlToJson);
    log.info({ history });
    return { history };
  } catch (error) {
    log.error({ err: error.stack }, 'Failed to ingest events');
    throw error;
  }
};