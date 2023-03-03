#!/bin/bash

set -e
set -o pipefail

CURRENT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CONFIGS_DIRECTORY="${CURRENT_DIRECTORY}/configs"
export configFilePath="${CURRENT_DIRECTORY}/config.json"
SOURCE_DIRECTORY="${CURRENT_DIRECTORY}/src"
CICD_COMMONS_DIRECTORY="${CURRENT_DIRECTORY}/../../cicd-commons/deployment-scripts"
DEPLOYMENT_DEPENDENCY_RESOLUTION="${CICD_COMMONS_DIRECTORY}/deploy/install-dependencies.sh"

mkdir -p ${CONFIGS_DIRECTORY}
environmentName=$(echo ${DMS_API_URL_PARAMETER} | awk -F'/' '{print $4}')
configFilePath="${CONFIGS_DIRECTORY}/config.${environmentName}.json"

dmsApiUrl=$(aws ssm get-parameter --name ${DMS_API_URL_PARAMETER} | jq -r '.Parameter.Value')
dmsApiKey=$(aws ssm get-parameter --name ${DMS_API_KEY_PARAMETER} --with-decryption | jq -r '.Parameter.Value')

curl -s -H "X-API-KEY: ${dmsApiKey}" https://${dmsApiUrl}/metadata | jq '.data' | python -m json.tool > ${configFilePath}

${DEPLOYMENT_DEPENDENCY_RESOLUTION} ${CURRENT_DIRECTORY}/package.template.json
export PATH="${CURRENT_DIRECTORY}/node_modules/.bin:$PATH"

serviceName=olympics-events-ingester
subServiceName=olympics-odf-processor
nextServiceStage=$(curl -s -H "X-API-KEY: ${dmsApiKey}" https://${dmsApiUrl}/servicestage/next?serviceName=${serviceName} | jq -r '.data')

# The serverless deployment configuration script reads the environment variable "ServiceStage"
export ServiceStage=${nextServiceStage}

resourceSsmPrefix=$(jq -r '.FixtureEnvVars.ResourceSsmPrefix' ${configFilePath})
resourceNamePrefix=$(jq -r '.FixtureEnvVars.ResourceNamePrefix' ${configFilePath})

echo ""
echo "Setting up the olympics-odf-processor service for the next service stage '${nextServiceStage}':"

export serviceSandboxMappingKey=lap_olympics_events_ingester

artifactPath="$CURRENT_DIRECTORY/odf-processor.zip"
zip -qr "$artifactPath" "$SOURCE_DIRECTORY"

bash "$CICD_COMMONS_DIRECTORY/veracode-sandbox/upload.sh" "$artifactPath"

rm -rf "$artifactPath"

cd "$SOURCE_DIRECTORY"
npm install --only=prod

cd "$CURRENT_DIRECTORY"

echo "Setting up the odf processor:"

executionSummaryFilePath="/tmp/serverless.out"
serverless deploy --config serverless.yml --conceal $@ | tee ${executionSummaryFilePath} | sed 's/^/    /'
stackName=$(cat ${executionSummaryFilePath} | grep "^stack:" | grep -o '[^, ]\+$')

lambdaFunctionName="${resourceNamePrefix}-${nextServiceStage}-${subServiceName}"
lambdaArnParameter="${resourceSsmPrefix}/${ServiceStage}/${subServiceName}/lambda_arn"
lambdaFunctionArn=$(aws lambda get-function --function-name  ${lambdaFunctionName} | jq -r '.Configuration.FunctionArn')

rm -f ${executionSummaryFilePath}

echo ""
echo "Lambda Function Arn: ${lambdaFunctionArn}"
printf "Storing Lambda Function Arn at ${lambdaArnParameter} in plaintext: "
curl -s -o /dev/null -H "X-API-KEY: ${dmsApiKey}" https://${dmsApiUrl}/ssm --data '{"name": "'${lambdaArnParameter}'", "value": "'${lambdaFunctionArn}'"}'
echo "[ OK ]"

echo ""
echo "Odf Processor was successfully created/updated!"
echo ""