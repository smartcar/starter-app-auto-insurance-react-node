import axios from 'axios';

let api = {};

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  // Allows cookies to be sent.
  withCredentials: true,
});

api.axiosInstance = instance;

api.exchangeCode = async (code) => {
  // the backend will attach the accessToken as a session cookie, which will be needed to make requests to vehicle endpoints
  return await instance.get(`/exchange?code=${code}`);
};

api.getVehicle = async () => {
  const { data } = await instance.get(`/vehicle`);
  return data;
};

api.disconnect = async (vehicleId) => {
  return await instance.delete('/vehicle', {
    params: { vehicleId }
  });
}

export default api;