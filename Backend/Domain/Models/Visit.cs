using Domain.Common.Exceptions;
using System;

namespace Domain.Models
{
    public class Visit : Entity
    {
        public Patient Patient { get; set; }
        public Doctor Doctor { get; set; }
        public DateTime Date { get; set; }
        public string Room { get; set; }
        public string Type { get; set; }
        public int Duration { get; set; }

        public Visit()
        {
        }

        public Visit(Guid visitId)
        {
            Id = visitId;
        }

        public Visit(Patient patient, Doctor doctor, DateTime date, string room, string type, int duration)
        {
            Patient = patient;
            Doctor = doctor;
            Date = date;
            SetType(type);
            SetRoom(room);
            Duration = duration;
        }

        public void SetRoom(string room)
        {
            if (string.IsNullOrWhiteSpace(room))
            {
                throw new ValidationException("Room must be chosen");
            }
            Room = room;
        }

        public void SetType(string type)
        {
            if (string.IsNullOrWhiteSpace(type))
            {
                throw new ValidationException("Visit type can not be empty");
            }
            Type = type;
        }
    }
}
