import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CdkApiUserStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //defining dynamodb table
    const userTable = cdk.aws_dynamodb.Table.fromTableName(this, 'userTable', 'User');

    //creating our api
    const api = new cdk.aws_apigateway.RestApi(this, 'apiTest', {
      restApiName: 'restApiForUserTest',
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
    const profileLambda = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'profileLambda',{
      entry: 'resources/endpoints/profile.ts',
      handler: 'handler',
      environment: {
        USER_TABLE: userTable.tableName,
      },
    });

    //granting permissions to lambda functions
    userTable.grantReadWriteData(profileLambda);

    //creating resources
    const profile = api.root.addResource('profiles');

    //integrating lambda functions with api gateway
    const profileIntegration = new cdk.aws_apigateway.LambdaIntegration(profileLambda);

    //adding methods to resources
    profile.addMethod('GET', profileIntegration, {
      apiKeyRequired: true,
    });
    profile.addMethod('POST', profileIntegration, {
      apiKeyRequired: true,
    });

    new cdk.CfnOutput(this, 'API Key ID', {
      value: apiKey.keyId,
    });

  }
}


