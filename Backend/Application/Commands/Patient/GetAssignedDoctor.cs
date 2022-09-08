using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class GetAssignedDoctor
    {
        [JsonIgnore]
        public Guid DoctorId { get; set; }
        [JsonIgnore]
        public Guid PatientId { get; set; }
    }
}
