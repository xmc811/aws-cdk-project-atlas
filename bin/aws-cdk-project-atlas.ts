#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SingleBucketStack } from '../lib/single-bucket-stack';
import { S3SNSNotificationStack } from '../lib/s3-sns-notification-stack';
import { S3StorageStack } from '../lib/s3-storage-stack';
import { GlueDataCatalogStack } from '../lib/glue-data-catalog-stack';
import { DataGenerationLambdaStack } from '../lib/data-generation-lambda-stack';
import { AthenaQueryResultStack } from '../lib/athena-query-result-stack';

const app = new cdk.App();

new SingleBucketStack(app, 'FirstBucket');

new S3SNSNotificationStack(app, 'S3SNSNotification', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
}
);

new S3StorageStack(app, 'S3Storage', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
}
);

new GlueDataCatalogStack(app, 'GlueDataCatalog', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
}
);

new AthenaQueryResultStack(app, 'AthenaQueryResult', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
}
);

new DataGenerationLambdaStack(app, 'DataGenerationLambda', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
}
);