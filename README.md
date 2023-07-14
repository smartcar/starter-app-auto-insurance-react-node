# Auto insurance starter app
This starter app enables users to authorize and review the statistics of their connected vehicles.

## What you can expect:
- The implementation of Smartcar Connect, allowing users to authorize vehicles through the Connect flow.
- A sample application page displaying the authorized vehicles and providing users with the option to disconnect vehicles if desired.
<img src=https://github.com/smartcar/starter-app-auto-insurance-react-node/assets/119897746/6f820618-bc93-4e29-beb4-2a08443ebf9c alt="connect screen" width=200 />
<img src=https://github.com/smartcar/starter-app-auto-insurance-react-node/assets/119897746/050eca86-6ae3-4050-b687-a44318c8aca0 alt="vehicle screen" width=200 />

Smartcar vehicle endpoints used:
- Vehicles
- Disconnect
- Engine oil life
- Location
- Odometer
- Tire pressure
- Vehicle attributes
- VIN

For the complete list of available endpoints, please visit our documentation page: https://smartcar.com/docs/api/#get-all-vehicles

## Repos included:
- **client**: Smartcar Javascript SDK and React
- **server**: Node and Express

## Instructions

1. Before we get started, create an application on the [Smartcar's Developer Dashboard](https://dashboard.smartcar.com/signup) to obtain your API keys. The following keys will be required:
    - `client_id`: This key can be found in your Smartcar Developer Dashboard under the 'Configuration' tab.
    - `redirect_uri`: As we'll be utilizing the Smartcar JS SDK and hosting the client on port 3000, the corresponding URI will be: `https://javascript-sdk.smartcar.com/v2/redirect?app_origin=http://localhost:3000`
    - `jsonwebtoken-key`: You can obtain a secret key using a generator like UUID or create one yourself. It should be a long and secure string, similar to a passphrase.

2. In the Configuration tab of your [Smartcar Developer Dashboard](https://dashboard.smartcar.com/signup), set your `redirect_uri` with the one above.

3. Please follow the instructions in the server-readme to set up a Node backend with Express. You will be prompted to provide your Smartcar keys and JWT key for storing the access token in a cookie. Feel free to review and adjust the Smartcar vehicle endpoints as per your requirements...

4. Follow the instructions in the client-readme to set up a React front end with Axios as the HTTP client. Please review how `smartcar` is instantiated in `App.jsx` and make any necessary  configurations for the Connect flow to suit your specific use case.
