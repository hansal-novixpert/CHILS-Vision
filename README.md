For running the cdk project use:<br>

cdk synth<br>
cdk bootstrap<br>
cdk deploy<br>

Save the apikey and url in a local file.<br>

run the command - aws apigateway get-api-key --api-key mdft9w7rve --include-value <br>
where instead of --api-key give your apikey<br>

Save the output of this command in a local file.<br>
Open Postman and run the requests using header x-api-key with value as given in the value field from the output of the command.<br>

API endpoints:<br>

/profiles - for creating and getting the user profiles<br>

cdk destroy to destroy the stack<br>
