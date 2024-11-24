import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
export const handler = async (event: any) => {
    const snsClient = new SNSClient()
    console.log(event);
    return {
        statusCode: 200,
         
        body: "da"
    }
}