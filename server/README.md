This is the Node server with Express. We'll use JWT to sign and verify the access token needed to make calls to the Smartcar api.

## Instructions

By now, you should have created a Smartcar account and have obtained the `client-id` and `secret`.

Set these environment variables:
```bash
$ export SMARTCAR_CLIENT_ID=<your-client-id>
$ export SMARTCAR_CLIENT_SECRET=<your-client-secret>
$ export SMARTCAR_REDIRECT_URI=https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:3000
$ export JWT_SECRET_KEY=<your-jsonwebtoken-key>
```
In production, replace the localhosts with the correct client and server urls.

To install the required dependencies and run this Node app
```bash
$ npm install
$ npm start
```
