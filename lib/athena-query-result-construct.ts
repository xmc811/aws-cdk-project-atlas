import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as athena from 'aws-cdk-lib/aws-athena';
import { ATHENA_RESULT_BUCKET_NAME } from './constants';

// Athena query result construct
export class AthenaQueryResultConstruct extends Construct {
  public readonly queryResultsBucket: s3.Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create an S3 bucket for Athena query results
    this.queryResultsBucket = new s3.Bucket(this, 'AthenaQueryResultsBucket', {
        bucketName: ATHENA_RESULT_BUCKET_NAME,
        versioned: false,
        removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Create an Athena Workgroup with the query result location
    const workGroup = 'example';
    new athena.CfnWorkGroup(this, 'MyWorkGroup', {
      name: workGroup,
      workGroupConfiguration: {
        resultConfiguration: {
          outputLocation: `s3://${this.queryResultsBucket.bucketName}/query-results/${workGroup}/`,
        },
      },
    });
  }
}