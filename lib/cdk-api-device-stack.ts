import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkApiDeviceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //defining dynamodb table
    const deviceTable = cdk.aws_dynamodb.Table.fromTableName(this, 'deviceTable', 'Device');
    //creating our api
    const api = new cdk.aws_apigateway.RestApi(this, 'apiTest', {
      restApiName: 'restApiForDeviceTest',
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
      },
      apiKeySourceType: cdk.aws_apigateway.ApiKeySourceType.HEADER,
    });

    //creating api key
    const apiKey = new cdk.aws_apigateway.ApiKey(this, 'apiKeyTest');

    //creating usage plan
    const usagePlan = new cdk.aws_apigateway.UsagePlan(this, 'usagePlanTest', {
      name: 'usagePlanTest',
      apiStages: [
        {
          api: api,
          stage: api.deploymentStage,
        },
      ],
    });

    usagePlan.addApiKey(apiKey);

    //creating lambda functions
    const deviceLambda = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'deviceLambda',{
      entry: 'resources/endpoints/devices.ts',
      handler: 'handler',
      environment: {
        DEVICE_TABLE: deviceTable.tableName,
      },
    });

    //granting permissions to lambda functions
    deviceTable.grantReadWriteData(deviceLambda);

    //creating resources
    const devices = api.root.addResource('devices');
    devices.addResource('{warehouse_id}');

    //integrating lambda functions with api gateway
    const deviceIntegration = new cdk.aws_apigateway.LambdaIntegration(deviceLambda);

    //adding methods to resources
    devices.addMethod('GET', deviceIntegration, {
      apiKeyRequired: true,
    });
    devices.addMethod('POST', deviceIntegration, {
      apiKeyRequired: true,
    });

    new cdk.CfnOutput(this, 'API Key ID', {
      value: apiKey.keyId,
    });
  }
}
