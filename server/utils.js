'use strict';
const smartcar = require('smartcar');
const jwt = require('jsonwebtoken');

/**
 * Helper function that returns smartcar vehicle instance.
 *
 * @param {string} vehicleId
 * @param {string} accessToken
 * @param {string} [unitSystem=imperial] imperial or metric
 * @returns {object} vehicle
 */
const createSmartcarVehicle = (
  vehicleId,
  accessToken,
  unitSystem = 'imperial',
) => {
  return new smartcar.Vehicle(vehicleId, accessToken, { unitSystem });
};

const getAccess = (req) => {
  const accessCookie = req.cookies?.sky_insurance;
  if (!accessCookie) {
    throw new Error('Access token missing in cookie');
  }
  // Decode the "sky_insurance" cookie value
  const access = jwt.verify(
    accessCookie,
    process.env.JWT_SECRET_KEY,
    );
  return access;
};

const handleSettlement = (settlement, errorMessage = 'Information unavailable') => {
  if (settlement.status === 'rejected') {
    // TODO: Implement backend error handling with settlement.reason 
    return {error: errorMessage}
  }
  return {...settlement.value}
}


module.exports = {
  createSmartcarVehicle,
  getAccess,
  handleSettlement,
};