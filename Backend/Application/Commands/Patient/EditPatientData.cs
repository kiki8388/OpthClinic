using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class EditPatientData
    {
        [JsonIgnore]
        public Guid PatientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime EditBirthDate { get; set; }
        public string StreetName { get; set; }
        public string BuildingNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Pesel { get; set; }
    }
}
