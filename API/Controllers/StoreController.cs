using System.Threading.Tasks;
using Application.Stores;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StoreController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetStores() {
            return HandleResult(await Mediator.Send(new List.Query{}));
        }

        // [HttpPost]
        // public async Task<IActionResult> CreateStore(Store store) {
        //     return HandleResult(await Mediator.Send(new Create.Command{Store = store}));
        // }

        // [HttpDelete]
        // public async Task<IActionResult> DeleteStore(Delete.Command command) {
        //     return HandleResult(await Mediator.Send(command));
        // }
    }
}