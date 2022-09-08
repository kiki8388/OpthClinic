using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class AssignPatient
    {
        [JsonIgnore]
        public Guid PatientId { get; set; }

        [JsonIgnore]
        public Guid DoctorId { get; set; }
    }
}
