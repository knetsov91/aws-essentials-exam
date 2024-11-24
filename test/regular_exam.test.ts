import * as cdk from "aws-cdk-lib";
import * as Application from "../lib/regular_exam-stack";
import "jest-cdk-snapshot";

test('CDK stack snapshot test', () => {
    const app = new cdk.App();
    const stack = new Application.RegularExamStack(app, "ApplicationStack");
    expect(stack).toMatchSnapshot();
});
