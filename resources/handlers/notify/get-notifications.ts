import { DynamoDBClient, QueryCommand, QueryCommandOutput } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({});
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Replace with your domain for security
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
};

export async function getNotifications({ warehouse_id }: { warehouse_id: string }) {
  // Define query parameters
  const queryParams = {
    TableName: process.env.EVENTS_TABLE, // Your DynamoDB table name
    KeyConditionExpression: 'warehouse_id = :warehouse_id',
    FilterExpression: '#status = :status',
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':warehouse_id': { S: warehouse_id },
      ':status': { S: 'NOTIFY' },
    },
  };

  try {
    // Execute query command
    const result: QueryCommandOutput = await dynamodb.send(new QueryCommand(queryParams));

    // Extract items
    const items = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(items),
      headers,
    };
  } catch (error) {
    console.error('Error querying review table:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not fetch data' }),
      headers,
    };
  }
}
