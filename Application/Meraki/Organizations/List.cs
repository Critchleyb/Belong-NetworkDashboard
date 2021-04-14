using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Domain.Meraki;
using MediatR;
using Newtonsoft.Json;

namespace Application.Meraki.Organizations
{
        public class List
    {

        public class Query : IRequest<Organization[]>
        {

        }

        public class Handler : IRequestHandler<Query, Organization[]>
        {
            private readonly IHttpClientFactory _clientFactory;
            public Handler(IHttpClientFactory clientFactory)
            {
                _clientFactory = clientFactory;
            }

            public async Task<Organization[]> Handle(Query request, CancellationToken cancellationToken)
            {
                var client = _clientFactory.CreateClient("meraki");

                HttpResponseMessage response = await client.GetAsync("organizations");
                response.EnsureSuccessStatusCode();

                string resultString = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<Organization[]>(resultString);

                return result;
            }
        }
    }
}
