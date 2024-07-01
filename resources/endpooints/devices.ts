import { APIGatewayProxyEvent } from 'aws-lambda';
import { getDevices } from '../handlers/devices/get-device';
import { create } from '../handlers/devices/create';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Replace with your domain for security
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
};

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        const warehouse_id = event.queryStringParameters?.warehouse_id;
        if (!warehouse_id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing warehouse_id' }),
            headers,
          };
        }
        return await getDevices({warehouse_id});
      case 'POST':
        return await create(event.body);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid HTTP method' }),
          headers,
        };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
      headers,
    };
  }
};