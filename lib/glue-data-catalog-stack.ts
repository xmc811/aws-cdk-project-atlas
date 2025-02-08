import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as glue from 'aws-cdk-lib/aws-glue';
import { GLUE_DATA_BUCKET_NAME } from './constants';
import { glue_tables } from './glue-table-definitions';

export class GlueDataCatalogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a Glue Database
    const glueDatabase = new glue.CfnDatabase(this, 'GlueDatabase', {
      catalogId: this.account,
      databaseInput: { name: 'mingchu_example_database' },
    });

    // Define a Glue Table (schema definition for S3 data)
    for (const table of glue_tables) {
      new glue.CfnTable(this, table.name, {
        catalogId: this.account,
        databaseName: glueDatabase.ref,
        tableInput: {
          name: table.name,
          tableType: 'EXTERNAL_TABLE',
          storageDescriptor: {
            columns: table.columns,
            location: `s3://${GLUE_DATA_BUCKET_NAME}/${table.prefix}/`,
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
    }
  }
}
