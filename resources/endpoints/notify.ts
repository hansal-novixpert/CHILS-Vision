import { APIGatewayProxyEvent } from "aws-lambda";
import { notifyInsert } from "../handlers/notify/notify-insert";
import { getNotifications } from "../handlers/notify/get-notifications";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Replace with your domain for security
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
};

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case "GET":
        const warehouse_id = event.pathParameters?.warehouse_id;
        if (!warehouse_id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing path parameter: id" }),
            headers,
          };
        }
        return await getNotifications({ warehouse_id });
      case "POST":
        return await notifyInsert(event.body);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Invalid HTTP method" }),
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
