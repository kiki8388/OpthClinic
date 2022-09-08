using System;
using System.Text.Json.Serialization;

namespace Application.Commands.Doctor
{
    public class GetDoctorById
    {
        [JsonIgnore]
        public Guid DoctorId { get; set; }
    }
}
