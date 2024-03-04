import { Duration, Stack, StackProps, RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { TableV2, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class ConnectSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const overrideTable = new TableV2(this, 'CallerOverride', {
      partitionKey: { name: 'phoneNumber', type: AttributeType.STRING },
      sortKey: { name: 'overrideType', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: 'Connect_CallerOverride',
      timeToLiveAttribute: 'expiry',
    });

    const overrideLambda = new Function(this, 'CallerOverrideLookupLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: Code.fromAsset('lambda'),
      functionName: 'Connect_CallerOverride_Lookup',
      environment: {
        CALLER_OVERRIDES_TABLE: overrideTable.tableName,
      },
    });

    overrideTable.grantReadData(overrideLambda);

    Tags.of(this).add('department', 'operations');
    Tags.of(this).add('application', 'contact-center');
  }
}
