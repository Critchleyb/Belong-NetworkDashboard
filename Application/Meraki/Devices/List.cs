using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Domain.Meraki;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Application.Meraki.Devices
{
    public class List
    {
        public class Query : IRequest<List<DeviceDTO>>
        {
            public string Store { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<DeviceDTO>>
        {
            private readonly IHttpClientFactory _clientFactory;
            private readonly ILogger<Handler> _logger;
            public Handler(IHttpClientFactory clientFactory, ILogger<Handler> logger)
            {
                _logger = logger;
                _clientFactory = clientFactory;
            }

            public async Task<List<DeviceDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var client = _clientFactory.CreateClient("meraki");

                HttpResponseMessage response = await client.GetAsync("networks/N_584905001604758657/devices");

                response.EnsureSuccessStatusCode();

                string resultString = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<List<Device>>(resultString);

                //If a store has been sent, filter to only devices that contain that store in the tags
                if (request.Store != null)
                {
                    var Searchedresult = from device in result
                                         where device.tags.Contains(request.Store) && device.tags.Contains("ArenaDashboard")
                                         select device;
                    result = Searchedresult.ToList<Device>();
                }

                List<DeviceDTO> resultDto = result.ConvertAll<DeviceDTO>(new Converter<Device, DeviceDTO>(DeviceToDeviceDTO));

                return resultDto;
            }

            private static DeviceDTO DeviceToDeviceDTO(Device device)
            {
                return new DeviceDTO{Name = device.name, Serial = device.serial};
            }
        }
    }
}