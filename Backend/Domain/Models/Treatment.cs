using System;

namespace Domain.Models
{
    public class Treatment : Visit
    {

        public Treatment()
        {
        }

        public Treatment(Guid treatmentId)
        {
            Id = treatmentId;
        }

        public Treatment(Patient patient, Doctor doctor, DateTime date, string room, string type, int duration)
            : base(patient, doctor, date, room, type, duration)
        {

        }

    }
}
