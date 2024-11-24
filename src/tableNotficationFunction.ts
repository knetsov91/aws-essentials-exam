import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
export const handler = async (event: any) => {
    const snsClient = new SNSClient()
    const topicArn = process.env.TOPIC_ARN;

    console.log(event);

    await snsClient.send(new PublishCommand({
        TopicArn: topicArn,
        Message: `validJSON ${event.text}`
    }))
    console.log("Notification send");
    return {
        statusCode: 200,
         
        body: "Notification send"
    }
}