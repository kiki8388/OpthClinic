using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class EditVisit
    {
        [JsonIgnore]
        public Guid VisitId { get; set; }
        public DateTime EditDate { get; set; }
        public string Room { get; set; }
    }
}
