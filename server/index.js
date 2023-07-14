'use strict';

const cors = require('cors');
const express = require('express');
const smartcar = require('smartcar');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { createSmartcarVehicle, handleSettlement } = require('./utils');
const { authenticate } = require('./middleware');

const corsOptions = {
  // TODO: specify production origin
  origin: [new RegExp("^http://localhost(:[0-9]+)?")],
  credentials: true,
  methods: ['POST', 'DELETE', 'GET', 'OPTIONS'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express()
  .use(cors(corsOptions))
  .use(express.json())
  .use(cookieParser());
const port = 8000;

const client = new smartcar.AuthClient({
  clientId: process.env.SMARTCAR_CLIENT_ID,
  clientSecret: process.env.SMARTCAR_CLIENT_SECRET,
  redirectUri: process.env.SMARTCAR_REDIRECT_URI,
  mode: 'live', // one of ['live', 'test', 'simulated']
});

app.get('/exchange', async function(req, res) {
  try {
    const code = req.query.code;
    const access = await client.exchangeCode(code)
    // we'll store the access object as a jwt in a session cookie
    // in a production app you'll want to store it in some kind of persistent storage and handle refreshing the token
    const accessToken = jwt.sign(
      access,
      process.env.JWT_SECRET_KEY,
    )
    res.cookie('sky_insurance', accessToken, {
      expires: 0, // makes this a session cookie
      path: '/',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
  
    res.status(200).json({ message: 'success' });
  } catch (err) {
    const message = err.message || 'Failed to exchange code for access token';
    // client is not receiving this custom error message for some reason
    res.status(500).json({error: message})
  }
});

app.get('/vehicle', authenticate, async function(req, res) {
  try {
    const { accessToken } = req.tokens;
    // get vehicle ids
    const { vehicles } = await smartcar.getVehicles(accessToken);
    // Since we're using Single Select, there should only be one vehicle attached to this access token. Otherwise, the client will have to include vehicleId in the request
    const vehicle = await createSmartcarVehicle(vehicles[0], accessToken);
    const [
      attributes,
      location,
      tirePressure,
      odometer,
      engineOil,
      vin,
    ] = await Promise.allSettled([
      vehicle.attributes(),
      vehicle.location(),
      vehicle.tirePressure(),
      vehicle.odometer(),
      vehicle.engineOil(),
      vehicle.vin(),
    ]);
    const vehicleData = {
      attributes: handleSettlement(attributes),
      location: handleSettlement(location),
      tirePressure: handleSettlement(tirePressure),
      odometer: handleSettlement(odometer),
      engineOil: handleSettlement(engineOil),
      vin: handleSettlement(vin),
    }
    console.log(vehicleData);
    res.json(vehicleData);
  } catch (err) {
    const message = err.message || 'Failed to get vehicle info.';
    res.status(500).json({error: message})
  }
});

app.delete('/vehicle', authenticate, async function(req, res) {
  try {
    const { accessToken } = req.tokens;
    const vehicleId = req.query.vehicleId;
    const vehicle = await createSmartcarVehicle(vehicleId, accessToken);
    await vehicle.disconnect();
    res.status(200).json({ message: 'vehicle successfully disconnected' });
  } catch (err) {
    const message = err.message || 'Failed to disconnect vehicle.';
    res.status(500).json({error: message})
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));
