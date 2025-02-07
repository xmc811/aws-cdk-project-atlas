import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class SingleBucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an S3 bucket
    new s3.Bucket(this, 'MyBucket', {
      bucketName: 'mingchu-first-bucket',
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Optional: Deletes bucket when stack is destroyed
    });
  }
}
