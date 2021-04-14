using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Stores
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string StoreNumber { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.StoreNumber).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var store = await _context.Stores.FindAsync(request.StoreNumber);

                if (store == null) return Result<Unit>.Failure("No store found with that store number");

                _context.Stores.Remove(store);

                bool success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Could not remove store from database");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}