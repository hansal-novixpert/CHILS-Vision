import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ScanCommand, ScanCommandOutput, ScanCommandInput } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const dynamodb = new DynamoDB({});
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Replace with your domain for security
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
};

export async function getBatch(): Promise<{ statusCode: number; body: string; headers: Record<string, string> }> {
  const N = 2; // Number of items to retrieve
  let items: Record<string, any>[] = [];
  let lastEvaluatedKey: Record<string, any> | undefined = undefined;

  try {
    do {
      // Define scan command parameters
      const scanParams: ScanCommandInput = {
        TableName: process.env.REVIEW_TABLE,
        FilterExpression: 'attribute_not_exists(user_id)', // Filter for items without 'user_id'
        Limit: N - items.length, 
        ExclusiveStartKey: lastEvaluatedKey 
      };

      const result: ScanCommandOutput = await dynamodb.send(new ScanCommand(scanParams));

      items = items.concat(result.Items || []);

      // Update the last evaluated key for pagination
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey && items.length < N);

    return {
      statusCode: 200,
      body: JSON.stringify(items),
      headers,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not fetch data' }),
      headers,
    };
  }
}
