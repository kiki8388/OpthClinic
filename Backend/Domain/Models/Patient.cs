using Domain.Common.Exceptions;
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Patient : User
    {
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public string Pesel { get; set; }
        public MedicalHistory MedicalHistory { get; set; }
        public Doctor AssignedDoctor { get; set; }
        public List<Visit> PlannedVisits { get; set; } = new List<Visit>();

        public Patient()
        {
        }

        public Patient(Guid patientId)
        {
            Id = patientId;
        }

        public Patient(string firstName, string lastName, string email, string streetName, string buildingNumber, string postalCode, string city, string country, string phone, DateTime birthDate, string pesel)
        {
            SetFirstName(firstName);
            SetLastName(lastName);
            SetEmail(email);
            SetStreetName(streetName);
            SetBuildingNumber(buildingNumber);
            SetPostalCode(postalCode);
            SetCity(city);
            SetCountry(country);
            SetPhone(phone);
            BirthDate = birthDate;
            SetPesel(pesel);
            RoleId = 1;
            MedicalHistory = new MedicalHistory();
            Age = (int)((DateTime.Now - BirthDate).TotalDays / 365.242199);
        }

        public void SetPesel(string pesel)
        {
            if (string.IsNullOrWhiteSpace(pesel))
            {
                throw new ValidationException("Pesel can not be empty.");
            }
            Pesel = pesel;
        }
    }
}
