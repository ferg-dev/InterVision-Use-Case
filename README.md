# Solution Description

This contact center use case is for a hypothetical company that runs a chain of dog daycare facilities. There were three main considerations when creating this design.

* Ability to initiate a contact through channel of choice: web based chat or voice contacts, traditional voice over toll-free or DID, in-app messaging or voice call, or SMS if desired.
* Allow for secure payments to limit PCI scope without third-party tools.
* Self-service options for common use cases: booking a reservation and managing payments.

In addition to the main considerations, some extra features are used to enhance the experience for customers, aid in contact center analytics, prevent some forms of simple abuse/spam, and data-driven routing instructions.

CDK code only includes a small sample of Lambda/DynamoDB lookup.

## Full Solution Diagram

PDF/PNG of solution diagram included.
![Solution_Diagram](https://github.com/ferg-dev/connect-sample/assets/16292964/e5d5a9fd-0f7f-4482-8fb2-e0e50ab4ae07)

## Further Enhancements

There are several other areas that could later be enhanced depending on needs that arise from normal operation. Some ideas would be:

* Configuration portal for dynamic routing changes
* Expanding historical analytics by pushing data to Redshift or using the new data lake creation from Connect
* Enable granular real-time reporting by processing Contact Events and Agent Events
* Custom dashboards using QuickSight
* Using Contact Lens to transcribe, create rules for searching/alerting, and perform theme detection across all contacts
* Alternate routing for potential spam/fraudulent calls using SageMaker model and SIP media headers
