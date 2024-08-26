using API.Errors;
using System.Net;
using System.Text.Json;

namespace API.Middleware {
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env) {
        public async Task InvokeAsync(HttpContext context) {
            try {
                await next(context);
            }
            catch (Exception exception) {
                logger.LogError(exception, exception.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                ApiException response;
                if (env.IsDevelopment()) { 
                    response = new ApiException(context.Response.StatusCode, exception.Message, exception.StackTrace);
                }
                else {
                    response = new ApiException(context.Response.StatusCode, exception.Message, "Internal server error");
                }
                
                JsonSerializerOptions options = new JsonSerializerOptions {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };
                string json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
