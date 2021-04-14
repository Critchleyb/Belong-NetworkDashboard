namespace Domain.Meraki
{

    public class Usage 
    {
        public float Sent { get; set; }
        public float Recv { get; set; }
    }
    public class Client
    {
        public Usage Usage { get; set; }
        public string Id { get; set; }
        public string Description { get; set; }
        public string Mac { get; set; }
        public string Ip { get; set; }
        public string Vlan { get; set; }

        #nullable enable
        public string? User { get; set; }
        public string? Switchport { get; set; }
        public string? MdnsName { get; set; }
        public string? DhcpHostName { get; set; }

    }
}