import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient());

export const handler = async (event) => {
  const overrideType = event.Details.Parameters.overrideType;
  const contactId = event.Details.ContactData.ContactId;
  const phone = event.Details.ContactData.CustomerEndpoint.Address;

  if (!overrideType) {
    console.error(`[${contactId} No override type specified for lookup`);
    return;
  }

  console.info(
    `[${contactId}] Checking for ${overrideType} override for ${phone}`
  );
  const params = {
    TableName: process.env.CALLER_OVERRIDES_TABLE,
    Key: {
      phoneNumber: phone,
      overrideType: overrideType,
    },
  };

  const dbResponse = await DbGetItem(params);
  if (!dbResponse || !dbResponse.Item) {
    console.info(`[${contactId}] No override found for ${phone}`);
    return;
  }

  console.info(
    `[${contactId}] Override found: ${JSON.stringify(dbResponse.Item)}`
  );
  return dbResponse.Item;
};

async function DbGetItem(params) {
  const command = new GetCommand(params);

  try {
    return await dynamo.send(command);
  } catch (err) {
    console.error(err, err.stack);
  }
}
