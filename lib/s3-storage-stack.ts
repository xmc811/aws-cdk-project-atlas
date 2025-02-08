import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { GLUE_DATA_BUCKET_NAME } from './constants';

export class S3StorageStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Create an S3 bucket for raw data
        new s3.Bucket(this, 'RawDataBucket', {
            bucketName: GLUE_DATA_BUCKET_NAME,
            versioned: false,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
        });
    }
}
