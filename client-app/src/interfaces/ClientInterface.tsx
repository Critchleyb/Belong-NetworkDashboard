import { SemanticCOLORS } from "semantic-ui-react";

export interface Client {
  usage: Usage;
  id: string;
  description: string;
  mac: string;
  ip: string;
  vlan: string;
  user: string | null;
  switchPort: string | null;
  mdnsName: string | null;
  dhcpHostName: string | null;
}

export interface Usage {
  sent: number;
  recv: number;
}

export class ClientClass implements Client {
  usage: Usage;
  id: string;
  description: string;
  mac: string;
  ip: string;
  vlan: string;
  user: string | null;
  switchPort: string | null;
  mdnsName: string | null;
  dhcpHostName: string | null;

  sent: number;
  recieved: number;

  constructor({ ...props }: Client) {
    this.usage = props.usage;
    this.id = props.id;
    this.description = props.description;
    this.mac = props.mac;
    this.ip = props.ip;
    this.vlan = props.vlan;
    this.user = props.user;
    this.switchPort = props.switchPort;
    this.mdnsName = props.mdnsName;
    this.dhcpHostName = props.dhcpHostName;

    this.sent = Math.round(props.usage.sent / 100);
    this.recieved = Math.round(props.usage.recv / 100);
  }

  get totalUsage(): number {
    return Math.round((this.usage.recv + this.usage.sent) / 100);
  }

  get vlanInfo(): { type: string; color: SemanticCOLORS } | null {
    var vlanInfo: { type: string; color: SemanticCOLORS } | null;
    switch (this.vlan) {
      case "700":
        vlanInfo = { type: "PC", color: "grey" };
        break;
      case "701":
        vlanInfo = { type: "Xbox", color: "green" };
        break;
      case "704":
        vlanInfo = { type: "Playstation", color: "blue" };
        break;
      case "702":
        vlanInfo = { type: "Management", color: "black" };
        break;
      default:
        vlanInfo = null;
        break;
    }
    return vlanInfo;
  }
}
