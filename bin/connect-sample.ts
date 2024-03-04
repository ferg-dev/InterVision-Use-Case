#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ConnectSampleStack } from '../lib/connect-sample-stack';

const app = new cdk.App();
new ConnectSampleStack(app, 'ConnectSampleStack');
