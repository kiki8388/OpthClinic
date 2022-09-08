using Domain.Common.Exceptions;
using System;

namespace Domain.Models
{
    public class Director : User
    {
        public string LicenseId { get; set; }

        public Director()
        {
        }

        public Director(Guid directorId)
        {
            Id = directorId;
        }

        public Director(string firstName, string lastName, string email, string streetName, string buildingNumber, string postalCode, string city, string country, string phone, string licenseId)
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
            RoleId = 4;
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
