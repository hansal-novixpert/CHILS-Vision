import { APIGatewayProxyEvent } from 'aws-lambda';
import { getProfiles } from '../handlers/profile/get-profiles';
import { createUser } from '../handlers/profile/create-profile';

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
        return await getProfiles();
      case 'POST':
        return await createUser(event.body);
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