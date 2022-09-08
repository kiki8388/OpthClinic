using Domain.Common.Exceptions;
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Doctor : User
    {
        public string About { get; set; }
        public string LicenseId { get; set; }
        public List<Visit> PlannedVisits { get; set; } = new List<Visit>();
        public List<Patient> PatientsList { get; set; } = new List<Patient>();

        public Doctor()
        {
        }

        public Doctor(Guid doctorId)
        {
            Id = doctorId;
        }

        public Doctor(string firstName, string lastName, string email, string streetName, string buildingNumber, string postalCode, string city, string country, string phone, string licenseId)
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
            SetLicenseId(licenseId);
            RoleId = 3;
        }

        public Doctor(List<Patient> patientsList)
        {
            PatientsList = patientsList;
        }

        public Doctor(List<Visit> visitsList)
        {
            PlannedVisits = visitsList;
        }

        public void AddPatientToList(Patient patient)
        {
            PatientsList.Add(patient);
        }

        public void RemovePatientFromList(Patient patient)
        {
            PatientsList.Remove(patient);
        }

        public void SetLicenseId(string licenseId)
        {
            if (string.IsNullOrWhiteSpace(licenseId))
            {
                throw new ValidationException("License ID can not be empty.");
            }
            LicenseId = licenseId;
        }
    }
}
