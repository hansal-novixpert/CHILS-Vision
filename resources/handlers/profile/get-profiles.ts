import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Replace with your domain for security
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
};

export async function getProfiles() {
  const result = await dynamodb.send(
    new ScanCommand({
      TableName: process.env.USER_TABLE,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
    headers,
  };
}