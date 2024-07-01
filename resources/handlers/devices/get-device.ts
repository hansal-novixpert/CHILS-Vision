import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Replace with your domain for security
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
};

export async function getDevices({ warehouse_id }: { warehouse_id: string }) {
    try {
        const result = await dynamodb.send(
            new ScanCommand({
              TableName: process.env.DEVICE_TABLE,
              FilterExpression: ' warehouse_id = warehouse_id',
              ExpressionAttributeValues: {
                ':warehouse_id': warehouse_id,
              },
            })
          );
  
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
        headers,
      };
    } catch (error) {
      console.error('Error querying device data:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Could not fetch data' }),
        headers,
      };
    }
  }