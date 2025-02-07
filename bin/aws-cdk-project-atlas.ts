#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SingleBucketStack } from '../lib/single-bucket-stack';

const app = new cdk.App();
new SingleBucketStack(app, 'AwsCdkProjectAtlasStack');