using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class EditDoctorAboutInfo
    {
        [JsonIgnore]
        public Guid DoctorId { get; set; }
        public string About { get; set; }
    }
}
