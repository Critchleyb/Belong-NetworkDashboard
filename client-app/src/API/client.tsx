import axios from "axios";
import { Device } from "../interfaces/DeviceInterface";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

// instance.interceptors.response.use(async (response) => {
//   if (process.env.NODE_ENV === "development") {
//     await sleep(2000);
//   }
//   return response;
// });

const store = {
  get: async () => instance.get("store"),
};

const devices = {
  get: async (id: string) => instance.get<Device[]>(`/meraki/devices/${id}`),
};

const clients = {
  get: async (device: string) =>
    instance.get(`/meraki/devices/clients/${device}`),
};

const client = {
  store,
  devices,
  clients,
};

export default client;
