using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class EditWorkerData
    {
        [JsonIgnore]
        public Guid WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Age { get; set; }
        public string StreetName { get; set; }
        public string BuildingNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string LicenseId { get; set; }
    }
}
