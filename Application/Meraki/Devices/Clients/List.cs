using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Domain.Meraki;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Application.Meraki.Devices.Clients
{
    public class List
    {
        public class Query : IRequest<List<Client>>
        {
            public string Device { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Device).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, List<Client>>
        {
            private readonly IHttpClientFactory _clientFactory;
            private readonly ILogger<Handler> _logger;
            public Handler(IHttpClientFactory clientFactory, ILogger<Handler> logger)
            {
                _logger = logger;
                _clientFactory = clientFactory;
            }

            public async Task<List<Client>> Handle(Query request, CancellationToken cancellationToken)
            {

                var client = _clientFactory.CreateClient("meraki");

                HttpResponseMessage clientsResponse = await client.GetAsync("devices/"+request.Device+"/clients?timespan=600");
                clientsResponse.EnsureSuccessStatusCode();

                string clientsResponseString = await clientsResponse.Content.ReadAsStringAsync();
                List<Client> returnedClientList = JsonConvert.DeserializeObject<List<Client>>(clientsResponseString);      

                return returnedClientList;
            }
        }
    }
}
