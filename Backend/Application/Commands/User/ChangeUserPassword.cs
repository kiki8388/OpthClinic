using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class ChangeUserPassword
    {
        [JsonIgnore]
        public Guid userId { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
