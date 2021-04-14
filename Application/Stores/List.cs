using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Stores
{
    public class List
    {
        public class Query : IRequest<Result<List<Store>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Store>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public Task<Result<List<Store>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Task.Run(() => {
                    var dbResponse = _context.Stores.ToList();

                    return Result<List<Store>>.Success(dbResponse);
                });
                
            }
        }
    }
}