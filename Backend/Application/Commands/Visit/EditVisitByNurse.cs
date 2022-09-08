using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class EditVisitByNurse
    {
        [JsonIgnore]
        public Guid VisitId { get; set; }
        public DateTime Date { get; set; }
        public string Room { get; set; }
        public string Type { get; set; }
    }
}
