import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const middyfy = (handler: any) => {
  return middy<APIGatewayProxyEvent, APIGatewayProxyResult>(handler).use(
    middyJsonBodyParser()
  );
};
