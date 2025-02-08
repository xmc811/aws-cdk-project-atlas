import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as s3notification from 'aws-cdk-lib/aws-s3-notifications';
import * as snsSub from 'aws-cdk-lib/aws-sns-subscriptions';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { FIRST_BUCKET_NAME } from './constants';

export class S3SNSNotificationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Use an existing S3 bucket
    const bucket = s3.Bucket.fromBucketName(this, 'MyBucket', FIRST_BUCKET_NAME);

    // Create an SNS Topic
    const topic = new sns.Topic(this, 'MyTopic', { topicName: 'S3DeleteObjectSNSTopic' });

    // Subscribe your email to the SNS Topic
    const email = ssm.StringParameter.valueFromLookup(this, 'personal-email');
    topic.addSubscription(new snsSub.EmailSubscription(email));

    // Set up an event notification to send the event to SNS on DELETE events
    bucket.addEventNotification(s3.EventType.OBJECT_REMOVED, new s3notification.SnsDestination(topic));
  }
}
