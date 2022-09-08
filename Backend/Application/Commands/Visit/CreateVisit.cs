using System;

namespace Application.Commands
{
    public class CreateVisit
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public DateTime Date { get; set; }
        public string Room { get; set; }
        public string Type { get; set; }
        public int Duration { get; set; }
    }
}
