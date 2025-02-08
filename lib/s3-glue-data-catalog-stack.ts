import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as glue from 'aws-cdk-lib/aws-glue';
import { GLUE_CATALOG_BUCKET_NAME } from './constants';
import { AthenaQueryResultConstruct } from './athena-query-result-construct';

export class S3GlueDataCatalogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for raw data
    const dataBucket = new s3.Bucket(this, 'RawDataBucket', {
        bucketName: GLUE_CATALOG_BUCKET_NAME,
        versioned: false,
        removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Define a Glue Database
    const glueDatabase = new glue.CfnDatabase(this, 'GlueDatabase', {
      catalogId: this.account,
      databaseInput: { name: 'mingchu_example_database' },
    });

    // Define a Glue Table (schema definition for S3 data)
    new glue.CfnTable(this, 'GlueTable', {
      catalogId: this.account,
      databaseName: glueDatabase.ref,
      tableInput: {
        name: 'person',
        tableType: 'EXTERNAL_TABLE',
        storageDescriptor: {
          columns: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
          ],
          location: `s3://${GLUE_CATALOG_BUCKET_NAME}/person/`,
          inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
          outputFormat: 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.apache.hadoop.hive.serde2.lazy.LazySimpleSerDe',
            parameters: {
              'field.delim': ',',
            },
           },
        },
      },
    });

    new AthenaQueryResultConstruct(this, 'AthenaQueryResultConstruct');
  }
}
