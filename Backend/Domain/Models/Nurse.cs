using Domain.Common.Exceptions;
using System;

namespace Domain.Models
{
    public class Nurse : User
    {
        public string LicenseId { get; set; }

        public Nurse()
        {
        }

        public Nurse(Guid nurseId)
        {
            Id = nurseId;
        }

        public Nurse(string firstName, string lastName, string email, string streetName, string buildingNumber, string postalCode, string city, string country, string phone, string licenseId)
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
            RoleId = 2;
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
