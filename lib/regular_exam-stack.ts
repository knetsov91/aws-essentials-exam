import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Lambda } from 'aws-cdk-lib/aws-ses-actions';
import { Construct } from 'constructs';
 

export class RegularExamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const imageUploadFunction = new NodejsFunction(
      this,
      "imageUploadFunction",
      {
        runtime: Runtime.NODEJS_20_X,
        handler: "handler",
        entry: `${__dirname}/../src/imageUploadFunction.ts`
    });
 
  }
}
