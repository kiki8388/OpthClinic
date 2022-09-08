using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Commands.Patient
{
    public class GetMedicalHistoryPatient
    {
        [JsonIgnore]
        public Guid PatientId { get; set; }
        [JsonIgnore]
        public Guid CurrentUserId { get; set; }
    }
}
