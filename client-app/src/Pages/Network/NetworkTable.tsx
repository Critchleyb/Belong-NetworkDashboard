import React from "react";
import { Label, Table } from "semantic-ui-react";
import { ClientClass } from "../../interfaces/ClientInterface";

interface Props {
  clients: ClientClass[];
}

export default function NetworkTable({ clients }: Props) {
  return (
    <Table celled size="small" compact striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>IP</Table.HeaderCell>
          <Table.HeaderCell>Total Usage</Table.HeaderCell>
          <Table.HeaderCell>Sent</Table.HeaderCell>
          <Table.HeaderCell>Recieved</Table.HeaderCell>
          <Table.HeaderCell>VLAN</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {clients.map((client) => (
          <Table.Row key={client.id}>
            <Table.Cell>{client.description}</Table.Cell>
            <Table.Cell>{client.ip}</Table.Cell>
            <Table.Cell>{client.totalUsage}MB</Table.Cell>
            <Table.Cell>{client.sent}MB</Table.Cell>
            <Table.Cell>{client.recieved}MB</Table.Cell>
            <Table.Cell>
              {client.vlan}{" "}
              {client.vlanInfo && (
                <Label
                  content={client.vlanInfo.type}
                  color={client.vlanInfo.color}
                />
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
