import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { IPost } from "../../../types";

const dynamodb = new DynamoDBClient({});
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Replace with your domain for security
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
};

export async function create(body: string | null) {
  // If no body, return an error
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing body" }),
      headers,
    };
  }

  // Parse the body
  const bodyParsed = JSON.parse(body) as IPost;
  const {
    warehouse_id,
    device_id,
    connectivity_status,
    correctness_status,
    is_deleted,
  } = bodyParsed;

  // Create the post in the device table
  const devicePutParams = new PutCommand({
    TableName: process.env.DEVICE_TABLE,
    Item: {
      warehouse_id: warehouse_id,
      device_id: device_id,
      connectivity_status: connectivity_status,
      correctness_status: correctness_status,
      is_deleted: is_deleted,
    },
  });

  try {
    await dynamodb.send(devicePutParams);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Device data inserted successfully" }),
      headers,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not insert device data",
      }),
      headers,
    };
  }
}
