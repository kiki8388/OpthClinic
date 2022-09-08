using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Domain.Common.Exceptions
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (NotFoundException notFoundException)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFoundException.Message);
            }
            catch (ValidationException validationException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(validationException.Message);
            }
            catch (AlreadyExistException alreadyExistException)
            {
                context.Response.StatusCode = 409;
                await context.Response.WriteAsync(alreadyExistException.Message);
            }
            catch (NotAllowedException notAllowedException)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(notAllowedException.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Something went wrong");
            }
        }
    }
}
