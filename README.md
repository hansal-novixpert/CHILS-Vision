For running the cdk project use:\\

cdk synth\\
cdk bootstrap\\
cdk deploy\\

Save the apikey and url in a local file.\\

run the command - aws apigateway get-api-key --api-key mdft9w7rve --include-value \\
where instead of mdft9w7rve give your apikey\\

Save the output of this command in a local file.\\
Open Postman and run the requests using header x-api-key with value as given in the value field from the output of the command.\\

API endpoints:\\

/batches - for allocation of jobs to operators\\
/notify - for notifying managers and inserting notifications by the operators\\
