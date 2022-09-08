using System;
using System.Linq;
using System.Security.Claims;

namespace Domain.Common.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            return Guid.Parse(user.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
        }
    }
}
