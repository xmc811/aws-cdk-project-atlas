#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SingleBucketStack } from '../lib/single-bucket-stack';
import { S3SNSNotificationStack } from '../lib/s3-sns-notification-stack';

const app = new cdk.App();
new SingleBucketStack(app, 'FirstBucket');
new S3SNSNotificationStack(app, 'S3SNSNotification', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    }
  }
);