For running the cdk project use:

cdk synth
cdk bootstrap
cdk deploy

Save the apikey and url in a local file.

run the command - aws apigateway get-api-key --api-key mdft9w7rve --include-value 
where instead of mdft9w7rve give your apikey

To install dependencies:
npm i -D esbuild
npm install aws-cdk-lib constructs   
npm i @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb @types/aws-lambda -lambda  

Save the output of this command in a local file.
Open Postman and run the requests using header x-api-key with value as given in the value field from the output of the command.

API endpoints:

/jobs - for allocation of videos to operators
/notify - for notifying managers
