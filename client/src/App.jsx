import React, { useState } from 'react';
import Smartcar from '@smartcar/auth';
import api from './api';
import './App.css';

import {
  Connect,
  Vehicle,
} from './components';

const staticText = {
  appName: "Sky Insurance",
}

const App = () => {
  const [vehicle, setVehicle] = useState({});
  const [error, setError] = useState(null);

  const onComplete = async (err, code, state) => {
    if (err) {
      console.log('An error occurred in the Connect flow, most likely because the user denied access');
      return;
    }
    try {
      await api.exchangeCode(code);
      const data = await api.getVehicle();
      setError(null);
      setVehicle(data);
    } catch (error) {
      const errorMessage = error.response.data.error;
      setError(new Error(errorMessage))
    }
  }

  const smartcar = new Smartcar({
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    // set scope of permissions: https://smartcar.com/docs/api/#permissions
    scope: [
      'read_vehicle_info',
      'read_location',
      'read_tires',
      'read_odometer',
      'read_engine_oil',
      'read_vin',
    ],
    mode: 'live', // one of ['live', 'test', 'simulated']
    onComplete,
  });

  const authorize = () => smartcar.openDialog({
    forcePrompt: true,
    // only allow users to authenticate ONE vehicle
    singleSelect: true,
  });

  const disconnect = async () => {
    try {
      const vehicleId = vehicle.attributes.id
      await api.disconnect(vehicleId);
      setError(null)
      setVehicle({});
    } catch (error) {
      const errorMessage = error.response.data.error;
      setError(new Error(errorMessage))
    }
  };
  
  return (
    <div className='content-wrapper'>
      <div className='content'>
        <h1>{staticText.appName}</h1>
        {Object.keys(vehicle).length !== 0
          ? <Vehicle info={vehicle} disconnect={disconnect}/>
          : <Connect onClick={authorize} />}
        {error && <div className='error'>{error.message}</div>}
      </div>
    </div>
  )
}

export default App;
