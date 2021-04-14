import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  DropdownItemProps,
  Label,
  Loader,
  Select,
  Table,
} from "semantic-ui-react";
import client from "../../API/client";
import { Client, ClientClass } from "../../interfaces/ClientInterface";
import { Device } from "../../interfaces/DeviceInterface";
import NetworkTable from "./NetworkTable";

export default function NetworkPage() {
  const { id } = useParams<{ id: string }>();

  const [clients, setClients] = useState<ClientClass[]>([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [loadingClients, setLoadingClients] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any | null>(null);
  const [selectOptions, setSelectOptions] = useState<DropdownItemProps[]>([]);

  useEffect(() => {
    async function GetDevices() {
      setLoadingDevices(true);
      var response = await client.devices.get(id);
      var devices: Device[] = response.data;

      const selectoptions: DropdownItemProps[] = devices.map((device) => {
        return new Object({
          key: device.serial,
          value: device.serial,
          text: device.name,
        });
      });

      //Set state and stop loading
      setSelectOptions(selectoptions);
      setLoadingDevices(false);
    }
    setSelectedDevice(null);
    setSelectOptions([]);
    GetDevices();
  }, [id]);

  useEffect(() => {
    async function GetClients() {
      setLoadingClients(true);
      var response = await client.clients.get(selectedDevice);
      const clients: ClientClass[] = response.data.map(
        (client: Client) => new ClientClass(client)
      );
      console.log(clients);
      clients.sort((a, b) => b.totalUsage - a.totalUsage);
      setClients(clients);
      setLoadingClients(false);
    }
    if (selectedDevice != null) {
      GetClients();
    } else if (selectedDevice == null) {
      setClients([]);
    }
  }, [selectedDevice]);

  async function handleRefresh() {
    const sleep = (delay: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    };

    var device = selectedDevice;
    setSelectedDevice(null);
    setLoadingClients(true);
    setLoadingDevices(true);
    await sleep(2000);
    setSelectedDevice(device);
    setLoadingDevices(false);
  }

  return (
    <div className="layout" style={{ flexGrow: 1 }}>
      <h1>Network Usage</h1>
      <p>Store: {id} | Network usage over the past 5 Minutes</p>
      <div style={{ display: "flex" }}>
        <Select
          search
          loading={loadingDevices}
          disabled={loadingDevices}
          placeholder="Select a Switch"
          options={selectOptions}
          onChange={(event, data) => setSelectedDevice(data.value)}
          value={selectedDevice}
        />
        <Button
          style={{ marginLeft: "1rem" }}
          onClick={() => handleRefresh()}
          disabled={selectedDevice == null}
        >
          Refresh
        </Button>
      </div>

      <Loader active={loadingClients}>Loading</Loader>
      {!loadingClients && clients.length > 0 ? (
        <NetworkTable clients={clients} />
      ) : (
        <></>
      )}
    </div>
  );
}
