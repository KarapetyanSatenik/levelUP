"use strict";

const LAP = require("@tr/lap_javascript_sdk");
const log = new LAP.Logger("index");
const controller = require("./lib/controller");

exports.handler = async (event) => {
  try {
    log.info({ event });
    const eventRecords = event.Records;
    let eventBody;
    let triggerId;
    let originatorScheduleId;

    for (let i = 0; i < eventRecords.length; i++) {
      const record = eventRecords[i];
      eventBody = JSON.parse(record.body);

      const hasTriggerType = eventBody.hasOwnProperty("triggerTypes");
      const response = await controller.processTriggerTypes({ triggerTypes });
      log.info({ response });
      const numRows = response.length;

      const getTriggerData = async (triggerTypes) => {
        return triggerTypes.reduce((acc, el) => {
          acc.push([e.MessageId]);
          return acc;
        }, []);
      };

      const getTriggerId = async () => {
        if (eventBody.hasOwnProperty("params")) {
          // This incoming event was coming from a on-demand invocation
          triggerId = eventBody.params[0].identifiers;
        } else {
          // This incoming event was coming from a scheduled invocation
          triggerId = eventBody.triggerId;
          const { originatorSchedule } = record.messageAttributes;
          if (originatorSchedule)
            originatorScheduleId = originatorSchedule.stringValue;
        }
        const response = await controller.processTriggerId({
          triggerId,
          originatorScheduleId,
        });
        log.info({ response });
        return [[response.MessageId]];
      };

      return {
        totalRowsCount: hasTriggerType ? numRows : 1,
        totalColumnsCount: 1,
        headers: [{ fieldName: "MessageId" }],
        data: hasTriggerType ? getTriggerData(response) : getTriggerId(),
      };
    }
  } catch (ex) {
    log.error(ex);
    throw ex;
  }
};
