import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { IPost } from "../../../types";

// const dynamodb = new DynamoDB({});
const dynamodb = new DynamoDBClient({});
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Replace with your domain for security
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
};

export async function updateOne(body: string | null) {
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
  const { video_id, warehouse_id, user_id, timestamp, item_id, item_name, item_count, flagvalue } =
    bodyParsed;

  const reviewPutParams = new PutCommand({
    TableName: process.env.REVIEW_TABLE,
    Item: {
      warehouse_id: warehouse_id,
      video_id: video_id,
      user_id: user_id,
      timestamp: timestamp,
      item_id: item_id,
      item_name: item_name,
      item_count: item_count,
      flagvalue: flagvalue,
    },
  });

  let inventoryUpdateParams;
  if(flagvalue === 1) {
    inventoryUpdateParams = new UpdateCommand({
      TableName: process.env.INVENTORY_TABLE,
      Key: {
        warehouse_id: warehouse_id,
        item_id: item_id,
      },
      UpdateExpression:
        'SET item_count = if_not_exists(item_count, :start) + :increment, item_name = :item_name',
      ExpressionAttributeValues: {
        ':increment': item_count,
        ':start': 0,
        ':item_name': item_name,
      },
      ReturnValues: "UPDATED_NEW",
    });
  }

  try {
    await dynamodb.send(reviewPutParams);
    if(inventoryUpdateParams) {
      await dynamodb.send(inventoryUpdateParams);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Review updated successfully" }),
      headers,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not insert review",
      }),
      headers,
    };
  }
}
