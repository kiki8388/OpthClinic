using System;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class DeleteVisit
    {
        [JsonIgnore]
        public Guid VisitId { get; set; }
        [JsonIgnore]
        public Guid UserId { get; set; }
    }
}
