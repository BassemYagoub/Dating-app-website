using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers {
    public class LogUserActivity : IAsyncActionFilter {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next) {
            var resultContext = await next();
            if (context.HttpContext.User.Identity?.IsAuthenticated != true) {
                return;
            }
            int userId = resultContext.HttpContext.User.GetUserId();
            IUnitOfWork unitOfWork = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            AppUser? user = await unitOfWork.UserRepository.GetUserByIdAsync(userId);
            if (user == null) {
                return;
            }
            user.LastActive = DateTime.UtcNow;
            await unitOfWork.Complete();
        }
    }
}
