import React from 'react';

const text = {
  odometer: 'Odometer',
  odometerValue: (distance) => `${distance.toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })} miles`,
  location: 'Location',
  latitude: (location) => `Lat: ${location.latitude.toFixed(4)}...`,
  longitude: (location) => `Long: ${location.longitude.toFixed(4)}...`,
  engineOil: 'Engine Oil Life',
  engineOilValue: (engineOil) => `${(engineOil.lifeRemaining * 100).toFixed()}% remaining`,
  tirePressure: 'Tire Pressure',
  frontLeft: (frontLeft) => `Front left: ${frontLeft.toFixed(1)} psi`,
  frontRight: (frontRight) => `Front right: ${frontRight.toFixed(1)} psi`,
  backLeft: (backLeft) => `Back left: ${backLeft.toFixed(1)} psi`,
  backRight: (backRight) => `Back right: ${backRight.toFixed(1)} psi`,
  disconnect: 'Disconnect',
}

const Vehicle = ({ info, disconnect }) => {
  const {attributes, location, tirePressure, odometer, engineOil, vin } = info;
  const {make, model, year} = attributes;
  const {frontLeft, frontRight, backLeft, backRight} = tirePressure;
  return (
    <div className='container vehicle'>
      <h2>{year} {make} {model}</h2>
      <p>{vin.vin}</p>
      <div className='container stats'>
        {!odometer.error &&
          <>
            <h3>{text.odometer}</h3>
            <p>{text.odometerValue(odometer.distance)}</p>
          </>
        }
        {!location.error &&
          <>
            <h3>{text.location}</h3>
            <ul>
              <li>{text.latitude(location)}</li>
              <li>{text.longitude(location)}</li>
            </ul>
          </>
        }
        {!engineOil.error && 
          <>
            <h3>{text.engineOil}</h3>
            <p>{text.engineOilValue(engineOil)}</p>
          </>
        }
        {!tirePressure.error &&
          <>
          <h3>{text.tirePressure}</h3>
          <ul>
            <li>{text.frontLeft(frontLeft)}</li>
            <li>{text.frontRight(frontRight)}</li>
            <li>{text.backLeft(backLeft)}</li>
            <li>{text.backRight(backRight)}</li>
          </ul>
          </>
        }
      </div>
      <div>
        <button className="disconnect" onClick={disconnect}>
          {text.disconnect}
        </button>
      </div>
    </div>
  );
} 

export default Vehicle;