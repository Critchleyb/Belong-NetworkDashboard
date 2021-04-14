using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Application.Meraki.Devices;
using Domain.Meraki;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class MerakiController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<Organization[]>> GetOrganizations()
        {
            return await Mediator.Send(new Application.Meraki.Organizations.List.Query{});
        }

        [HttpGet("devices")]
        public async Task<ActionResult<List<DeviceDTO>>> GetDevices() 
        {
            return await Mediator.Send(new Application.Meraki.Devices.List.Query{});
        }

        [HttpGet("devices/{store}")]
        public async Task<ActionResult<List<DeviceDTO>>> GetDeviceByStore(string store) 
        {
            return await Mediator.Send(new Application.Meraki.Devices.List.Query{Store = store});
        }

        [HttpGet("devices/clients/{device}")]
        public async Task<ActionResult<List<Client>>> GetDeviceClients(string device) 
        {
            return await Mediator.Send(new Application.Meraki.Devices.Clients.List.Query{Device = device});
        }
    }
}