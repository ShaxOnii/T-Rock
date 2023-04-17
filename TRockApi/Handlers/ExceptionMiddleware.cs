using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TRockApi.Response;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public class ExceptionMiddleware {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger) {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext) {
            try {
                await _next(httpContext);
            }
            catch (Error error) {
                _logger.LogError($"An error occured '{error.Message()}' \n {error}");
                await HandleErrorAsync(httpContext, error);
            }
            catch (MultipleErrors error) {
                _logger.LogError($"An errors occured '{error.Errors.Select(e => e.Message())}' \n {error}");
                await HandleErrorsAsync(httpContext, error);
            }
            catch (Exception exception) {
                _logger.LogError($"Something went wrong: {exception}");
                await HandleExceptionAsync(httpContext, exception);
            }
        }

        private async Task HandleErrorAsync(HttpContext context, Error error) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.BadRequest;

            var response = ToErrorResponse(error, context.Response.StatusCode);

            await context.Response.WriteAsync(response.ToString());
        }

        private async Task HandleErrorsAsync(HttpContext context, MultipleErrors errors) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.BadRequest;

            await context.Response.WriteAsync(new ErrorResponse {
                StatusCode = context.Response.StatusCode,
                Errors = errors.Errors.Select(e => ToErrorResponse(e, null))
            }.ToString());
        }

        private ErrorResponse ToErrorResponse(Error error, int? statusCode) {
            return new ErrorResponse {
                Message = error.Message(),
                Type = error.Name(),
                StatusCode = statusCode
            };
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception) {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

            await context.Response.WriteAsync(new ErrorResponse {
                Message = exception.Message,
                Type = "InternalServerError",
                StatusCode = context.Response.StatusCode
            }.ToString());
        }
    }
}