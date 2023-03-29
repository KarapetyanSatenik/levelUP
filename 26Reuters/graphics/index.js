const AWS = require("aws-sdk");
const tableName = "a202187-gfx-test-publishedgraphics-dynamodb";
AWS.config.update({
  region: "eu-west-1",
  apiVersion: "latest",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function retrieveGraphicsFromDynamoDB(tableName) {
  var params = {
    TableName: tableName,
    Limit: 1000,
    FilterExpression: "contains (#publishingData, :publishingValue)",
    ExpressionAttributeNames: {
      "#publishingData": "publishing",
    },
    ExpressionAttributeValues: {
      ":publishingValue": {
        locations: [{ published: true, hosted: true, state: "Success" }],
      },
    },
    ProjectionExpression: "modified, publishing",
  };
  return new Promise((resolve, reject) => {
    dynamodb.scan(params, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      } else if (result) {
        resolve(result);
      } else {
        reject("Unknown error");
      }
    });
  });
}

retrieveGraphicsFromDynamoDB(tableName)
  .then((res) => {
    console.log(1, res);
  })
  .catch((er) => {
    console.log(2, err);
  });
