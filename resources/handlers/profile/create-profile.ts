import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { IPost } from "../../../types";

const dynamodb = new DynamoDBClient({});
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Replace with your domain for security
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
};

export async function createUser(body: string | null) {
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
  const { user_type, user_name, phone_no, name, email, username, password } =
    bodyParsed;

  const user_id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
    
  // Create the user in the user table
  const userPutParams = new PutCommand({
    TableName: process.env.USER_TABLE,
    Item: {
      user_id: user_id,
      user_type: user_type,
      phone_no: phone_no,
      name: name,
      email: email,
      username: username,
      password: password,
    },
  });

  try {
    await dynamodb.send(userPutParams);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User data inserted successfully" }),
      headers,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not insert user data",
      }),
      headers,
    };
  }
}
