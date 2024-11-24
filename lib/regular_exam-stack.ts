import * as cdk from 'aws-cdk-lib';
import { EndpointType, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import {CorsOptions,Cors } from 'aws-cdk-lib/aws-apigateway';
import { Lambda, S3 } from 'aws-cdk-lib/aws-ses-actions';
import { Construct } from 'constructs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { AttributeType, BillingMode, StreamViewType, Table } from 'aws-cdk-lib/aws-dynamodb';
 

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
    const successTopic = new Topic(this, 'SuccessTopic', {
      topicName: "SuccessTopic"
    });
    const sendNotificationFunction = new NodejsFunction(
      this,
      "sendNotificationFunction",
      {
        runtime: Runtime.NODEJS_20_X,
        handler: "handler",
        entry: `${__dirname}/../src/tableNotficationFunction.ts`,
        environment: {
          
          TOPIC_ARN: successTopic.topicArn
        }
    });
     const restApiGateway = new RestApi(this, "ExamRestApi",
       {endpointTypes: [EndpointType.REGIONAL],
         
        defaultCorsPreflightOptions: {
          allowOrigins: Cors.ALL_ORIGINS,
          allowMethods: Cors.ALL_METHODS
         }
        }
      );


    const imageUploadResource = restApiGateway.root.addResource("imageUpload");
    imageUploadResource.addMethod("POST", new LambdaIntegration(imageUploadFunction,
       {proxy: true}));
 
    
    
    const storage = new S3({bucket:'imagesBucket'});
    const metadataTable = new Table(this, 'ImagesMetadataTable', {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
  
      billingMode: BillingMode.PAY_PER_REQUEST

    });
    metadataTable.addGlobalSecondaryIndex({
      indexName: "extensionAttr",
      partitionKey: {name: "extensionAttr", type: AttributeType.STRING}

    })
  }
}
