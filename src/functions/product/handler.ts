import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyHandler } from 'aws-lambda';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const dynamoDb = DynamoDBDocumentClient.from(client);
const TableName = process.env.DYNAMODB_TABLE || 'Products';

export const list: APIGatewayProxyHandler = async () => {
  try {
    const command = new ScanCommand({
      TableName: "serverless-http-api-typescript-dev"
    });

    const result = await dynamoDb.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// // Create
// export const create: APIGatewayProxyHandler = async (event) => {
//   try {
//     const data = JSON.parse(event.body || '');
//     const timestamp = new Date().getTime();
    
//     const item = {
//       id: uuid(),
//       name: data.name,
//       price: data.price,
//       createdAt: timestamp,
//       updatedAt: timestamp,
//     };

//     await dynamoDb.put({
//       TableName,
//       Item: item
//     }).promise();

//     return {
//       statusCode: 201,
//       body: JSON.stringify(item)
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };

// // Read (Get One)
// export const get: APIGatewayProxyHandler = async (event) => {
//   try {
//     const { id } = event.pathParameters || {};

//     const result = await dynamoDb.get({
//       TableName,
//       Key: { id }
//     }).promise();

//     if (!result.Item) {
//       return {
//         statusCode: 404,
//         body: JSON.stringify({ message: 'Product not found' })
//       };
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify(result.Item)
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };

// // Read (List All)
// export const list: APIGatewayProxyHandler = async () => {
//   try {
//     const result = await dynamoDb.scan({
//       TableName : "serverless-http-api-typescript-dev"
//     }).promise();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(result.Items)
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };

// // Update
// export const update: APIGatewayProxyHandler = async (event) => {
//   try {
//     const { id } = event.pathParameters || {};
//     const data = JSON.parse(event.body || '');
    
//     const timestamp = new Date().getTime();

//     const result = await dynamoDb.update({
//       TableName,
//       Key: { id },
//       UpdateExpression: 'SET name = :name, price = :price, updatedAt = :updatedAt',
//       ExpressionAttributeValues: {
//         ':name': data.name,
//         ':price': data.price,
//         ':updatedAt': timestamp
//       },
//       ReturnValues: 'ALL_NEW'
//     }).promise();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(result.Attributes)
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };

// // Delete
// export const remove: APIGatewayProxyHandler = async (event) => {
//   try {
//     const { id } = event.pathParameters || {};

//     await dynamoDb.delete({
//       TableName,
//       Key: { id }
//     }).promise();

//     return {
//       statusCode: 204,
//       body: ''
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message })
//     };
//   }
// };
