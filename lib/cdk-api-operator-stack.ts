import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class CdkApiOperatorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //defining dynamodb table
    const videoTable = cdk.aws_dynamodb.Table.fromTableName(
      this,
      "videoTable",
      "Video"
    );
    const eventsTable = cdk.aws_dynamodb.Table.fromTableName(
      this,
      "eventsTable",
      "Events"
    );
    const inventoryTable = cdk.aws_dynamodb.Table.fromTableName(
      this,
      "inventoryTable",
      "Inventory"
    );
    const reviewTable = cdk.aws_dynamodb.Table.fromTableName(
      this,
      "reviewTable",
      "Review"
    );

    //creating our api
    const api = new cdk.aws_apigateway.RestApi(this, "apiOperatorTest", {
      restApiName: "restApiForOperatorTest",
      defaultCorsPreflightOptions: {
        allowOrigins: cdk.aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: cdk.aws_apigateway.Cors.ALL_METHODS,
      },
      apiKeySourceType: cdk.aws_apigateway.ApiKeySourceType.HEADER,
    });

    //creating api key
    const apiKey = new cdk.aws_apigateway.ApiKey(this, "apiKeyOperatorTest");

    //creating usage plan
    const usagePlan = new cdk.aws_apigateway.UsagePlan(
      this,
      "usagePlanOperatorTest",
      {
        name: "usagePlanOperatorTest",
        apiStages: [
          {
            api: api,
            stage: api.deploymentStage,
          },
        ],
      }
    );

    usagePlan.addApiKey(apiKey);

    //creating lambda functions
    const batchesLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "batchesLambda",
      {
        entry: "resources/endpoints/batches.ts",
        handler: "handler",
        environment: {
          EVENTS_TABLE: eventsTable.tableName,
          INVENTORY_TABLE: inventoryTable.tableName,
          REVIEW_TABLE: reviewTable.tableName,
        },
      }
    );

    const notifyLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "notifyLambda",
      {
        entry: "resources/endpoints/notify.ts",
        handler: "handler",
        environment: {
          EVENTS_TABLE: eventsTable.tableName,
          REVIEW_TABLE: reviewTable.tableName,
        },
      }
    );

    //granting permissions to lambda functions
    eventsTable.grantReadWriteData(batchesLambda);
    inventoryTable.grantReadWriteData(batchesLambda);
    reviewTable.grantReadWriteData(batchesLambda);
    reviewTable.grantReadWriteData(notifyLambda);
    eventsTable.grantReadWriteData(notifyLambda);

    //creating resources
    const batches = api.root.addResource("batches");
    const notify = api.root.addResource("notify");
    const notifyWarehouse = notify.addResource("{warehouse_id}");

    //integrating lambda functions with api gateway
    const batchesIntegration = new cdk.aws_apigateway.LambdaIntegration(
      batchesLambda
    );
    const notifyIntegration = new cdk.aws_apigateway.LambdaIntegration(
      notifyLambda
    );

    //adding methods to resources
    batches.addMethod("GET", batchesIntegration, {
      apiKeyRequired: true,
    });
    batches.addMethod("POST", batchesIntegration, {
      apiKeyRequired: true,
    });

    notifyWarehouse.addMethod("GET", notifyIntegration, {
      apiKeyRequired: true,
    });

    notify.addMethod("POST", notifyIntegration, {
      apiKeyRequired: true,
    });

    new cdk.CfnOutput(this, "API Key ID", {
      value: apiKey.keyId,
    });
  }
}
