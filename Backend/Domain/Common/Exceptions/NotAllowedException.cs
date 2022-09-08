using System;

namespace Domain.Common.Exceptions
{
    public class NotAllowedException : Exception
    {
        public NotAllowedException(string message) : base(message)
        {
        }
    }
}
