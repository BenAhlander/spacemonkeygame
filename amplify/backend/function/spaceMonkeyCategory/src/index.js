const randomBytes = require("crypto").randomBytes;
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  console.log("HIT!");

  if (!event.requestContext.authorizer) {
    errorResponse(
      "Authorization not configured",
      context.awsRequestId,
      callback
    );
    return;
  }

  const questionId = toUrlString(randomBytes(16));
  console.log("Received event (", questionId, "): ", event);

  // Because we're using a Cognito User Pools authorizer, all of the claims
  // included in the authentication token are provided in the request context.
  // This includes the username as well as other attributes.
  const username = event.requestContext.authorizer.claims["cognito:username"];

  console.log(`User Name ${username}`);

  // The body field of the event in a proxy integration is a raw string.
  // In order to extract meaningful values, we need to first parse this string
  // into an object. A more robust implementation might inspect the Content-Type
  // header first and use a different parsing strategy based on that value.
  const requestBody = JSON.parse(event.body);

  const question = {
    question: "What is the funniest moment you can think of?",
    imgURL: "https://source.unsplash.com/random",
  };

  recordRide(questionId, username, question)
    .then(() => {
      // You can use the callback function to provide a return value from your Node.js
      // Lambda functions. The first parameter is used for failed invocations. The
      // second parameter specifies the result data of the invocation.

      // Because this Lambda function is called by an API Gateway proxy integration
      // the result object must use the following structure.
      console.log("INSIDE THE PROMISE");
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          QuestionId: questionId,
          QuestionObj: question,
          Question: question.question,
          User: username,
          imgUrl: question.imgURL,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    })
    .catch((err) => {
      console.log(err);

      // If there is an error during processing, catch it and return
      // from the Lambda function successfully. Specify a 500 HTTP status
      // code and provide an error message in the body. This will provide a
      // more meaningful error response to the end client.
      errorResponse(err.message, context.awsRequestId, callback);
    });
};

// This is where you would implement logic to find the optimal unicorn for
// this ride (possibly invoking another Lambda function as a microservice.)
// For simplicity, we'll just pick a unicorn at random.

function recordRide(rideId, username, question) {
  console.log("HIT RECORD RIDE " + rideId + " " + rideId);
  return ddb
    .put({
      TableName: "Questions",
      Item: {
        QuestionId: rideId,
        QuestionObj: question,
        Question: question.question,
        User: username,
        imgUrl: question.imgURL,
        RequestTime: new Date().toISOString(),
      },
    })
    .promise();
}

function toUrlString(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
