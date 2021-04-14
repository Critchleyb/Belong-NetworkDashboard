using Domain;
using FluentValidation;

namespace Application.Stores
{
    public class StoreValidator : AbstractValidator<Store>
    {
        public StoreValidator()
        {
            RuleFor(x => x.name).NotEmpty();
            RuleFor(x => x.storeNumber).NotEmpty();
            RuleFor(x => x.squadName).NotEmpty();
        }
    }
}