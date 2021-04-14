using System.Collections.Generic;

namespace Domain.Meraki
{
    public class Device
    {
        public string name { get; set; }
        public string serial { get; set; }
        public List<string> tags { get; set; }

        #nullable enable
        public float? lat { get; set; }
        public float? lng { get; set; }
        public string? mac { get; set; }
        public string? model { get; set; }
        public string? address { get; set; }
        public string? notes { get; set; }
        public string? lanIP { get; set; }
        public string? networkId { get; set; }
        public object? beaconIdParams { get; set; }
        public string? firmware { get; set; }
        public string? floorPlanId { get; set; }

    }
}