using System;

namespace Domain.Models
{
    public class MedicalHistory : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public float DistReSphere { get; set; }
        public float DistReCylinder { get; set; }
        public float DistReAxis { get; set; }
        public float DistRePupilDistance { get; set; }
        public float DistLeSphere { get; set; }
        public float DistLeCylinder { get; set; }
        public float DistLeAxis { get; set; }
        public float DistLePupilDistance { get; set; }
        public float CloseReSphere { get; set; }
        public float CloseReCylinder { get; set; }
        public float CloseReAxis { get; set; }
        public float CloseRePupilDistance { get; set; }
        public float CloseLeSphere { get; set; }
        public float CloseLeCylinder { get; set; }
        public float CloseLeAxis { get; set; }
        public float CloseLePupilDistance { get; set; }
        public string Recommendations { get; set; }
        public string Status { get; set; }

        public MedicalHistory()
        {
        }

        public MedicalHistory(string name, string description, string recommendations)
        {
            Name = name;
            Description = description;
            Recommendations = recommendations;
        }

        public MedicalHistory(Guid medicalHistoryId)
        {
            Id = medicalHistoryId;
        }
    }
}
