/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'serverless-typescript',
  frameworkVersion: '3',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      packager: 'npm',
    },
    localstack: {
      stages: ['local'],
      host: 'http://localhost',
      edgePort: 4566,
      autoStart: false, // LocalStack geralmente já roda separadamente
    },
    stage: '${opt:stage, "local"}',
    stages: ['local', 'staging', 'production'],
    prune: {
      automatic: true,
      number: 3,
    },
    alerts: {
      dashboards: true,
      definitions: {
        '5XXErrors': {
          name: '5XXErrors',
          namespace: 'AWS/ApiGateway',
          metric: '5XXError',
          omitDefaultDimension: true,
          dimensions: [
            {
              Name: 'ApiName',
              Value: '${self:service}-${self:custom.stage}',
            },
            {
              Name: 'Stage',
              Value: '${self:custom.stage}',
            },
          ],
          threshold: 5,
          statistic: 'Sum',
          period: 60,
          evaluationPeriods: 1,
          datapointsToAlarm: 1,
          comparisonOperator: 'GreaterThanOrEqualToThreshold',
        },
      },
      alarms: ['functionThrottles', 'functionErrors', '5XXErrors'],
    },
  },
  plugins: [
    'serverless-localstack', // Mantenha este plugin no topo
    'serverless-webpack',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
    'serverless-plugin-aws-alerts',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x', // Atualize para uma versão mais recente
    stage: 'local',
    region: 'us-east-1',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['codedeploy:*'],
        Resource: '*',
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: false, // activate to see CacheHits and Misses
    },
    logs: {
      // activate to see API Gateway logs
      restApi: {
        accessLogging: false,
        executionLogging: false,
        level: 'INFO',
        fullExecutionData: false,
      },
    },
    environment: {
      AWS_ACCESS_KEY_ID: 'test',
      AWS_SECRET_ACCESS_KEY: 'test',
      AWS_DEFAULT_REGION: 'us-east-1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    hello: {
      ...hello,
      handler: 'src/functions/hello/handler.main',
    },
  },
};

module.exports = serverlessConfiguration;
