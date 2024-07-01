import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { IPost } from "../../../types";

// const dynamodb = new DynamoDB({});
const dynamodb = new DynamoDBClient({});
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Replace with your domain for security
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
};

export async function notifyInsert(body: string | null) {
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
    video_id,
    warehouse_id,
    user_id,
    timestamp,
    item_id,
    item_name,
    item_count,
    flagvalue,
  } = bodyParsed;

  let reviewPutParams, eventsPutParams;
  if (flagvalue === 0) {
    reviewPutParams = new PutCommand({
      TableName: process.env.REVIEW_TABLE,
      Item: {
        warehouse_id: warehouse_id,
        video_id: video_id,
        user_id: user_id,
        timestamp: timestamp,
        flagvalue: flagvalue,
      },
    });
    const status = "NOTIFY";
    eventsPutParams = new PutCommand({
      TableName: process.env.EVENTS_TABLE,
      Item: {
        warehouse_id: warehouse_id,
        video_id: video_id,
        item_id: item_id,
        item_name: item_name,
        item_count: item_count,
        timestamp: timestamp,
        status: status,
      },
    });
  }

  try {
    if (reviewPutParams) {
      await dynamodb.send(reviewPutParams);
    }
    if (eventsPutParams) {
      await dynamodb.send(eventsPutParams);
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Notified successfully" }),
      headers,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not insert notification",
      }),
      headers,
    };
  }
}
