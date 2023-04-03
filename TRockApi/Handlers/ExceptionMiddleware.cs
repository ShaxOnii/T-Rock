using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TRockApi.Response;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public class ExceptionMiddleware {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger logger) {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext) {
            try {
                await _next(httpContext);
            }
            catch (Error error) {
                _logger.LogError($"An error occured: {error}");
                await HandleExceptionAsync(httpContext, error);
            }
            catch (Exception exception) {
                _logger.LogError($"Something went wrong: {exception}");
                await HandleExceptionAsync(httpContext, exception);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Error error) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.BadRequest;

            await context.Response.WriteAsync(new ErrorResponse {
                Message = error.Message(),
                Type = error.Name(),
                StatusCode = context.Response.StatusCode
            }.ToString());
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.BadRequest;

            await context.Response.WriteAsync(new ErrorResponse {
                Message = exception.Message,
                Type = "InternalServerError",
                StatusCode = context.Response.StatusCode
            }.ToString());
        }
    }
}