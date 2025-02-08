import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { GLUE_DATA_BUCKET_NAME } from './constants';

export class DataGenerationLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Use an existing S3 bucket
    const dataBucket = s3.Bucket.fromBucketName(this, 'MyBucket', GLUE_DATA_BUCKET_NAME);

    // Use a customized layer
    const namesLayer = new lambda.LayerVersion(this, 'NamesLayer', {
      code: lambda.Code.fromAsset('lambda_layer/names/names_layer.zip'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_12],
    });

    // Define the Lambda function
    const dataGenLambda = new lambda.Function(this, 'DataGenLambda', {
      functionName: 'data-generation-lambda',
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'generate_data.lambda_handler',
      code: lambda.Code.fromAsset('lambda'),
      layers: [namesLayer],
      timeout: cdk.Duration.seconds(30),
      environment: {
        BUCKET_NAME: dataBucket.bucketName,
      },
    });

    // Add the public AWS-managed layer
    dataGenLambda.addLayers(
      lambda.LayerVersion.fromLayerVersionArn(
        this,
        'AWSSDKPandasLayer',
        'arn:aws:lambda:us-east-1:336392948345:layer:AWSSDKPandas-Python312:16'
      )
    );

    // Grant the Lambda function permissions to write to S3
    dataBucket.grantWrite(dataGenLambda);
  }
}
