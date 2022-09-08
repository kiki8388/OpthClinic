using Domain.Common.Exceptions;
using System;

namespace Domain.Models
{
    public class User : Entity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string StreetName { get; set; }
        public string BuildingNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }

        public User()
        {
        }

        public User(Guid userId)
        {
            Id = userId;
        }

        public User(string firstName, string lastName, string email, string streetName, string buildingNumber, string postalCode, string city, string country, string phone)
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
        }

        public void SetFirstName(string firstName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new ValidationException("First name cannot be empty.");
            }
            FirstName = firstName;
        }

        public void SetLastName(string lastName)
        {
            if (string.IsNullOrWhiteSpace(lastName))
            {
                throw new ValidationException("Last name cannot be empty.");
            }
            LastName = lastName;
        }

        public void SetEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ValidationException("Email cannot be empty.");
            }
            Email = email;
        }

        public void SetStreetName(string streetName)
        {
            if (string.IsNullOrWhiteSpace(streetName))
            {
                throw new ValidationException("Street name can not be empty.");
            }
            StreetName = streetName;
        }

        public void SetBuildingNumber(string buildingNumber)
        {
            if (string.IsNullOrWhiteSpace(buildingNumber))
            {
                throw new ValidationException("Building number can not be empty.");
            }
            BuildingNumber = buildingNumber;
        }

        public void SetPostalCode(string postalCode)
        {
            if (string.IsNullOrWhiteSpace(postalCode))
            {
                throw new ValidationException("Postal code can not be empty.");
            }
            PostalCode = postalCode;
        }

        public void SetCity(string city)
        {
            if (string.IsNullOrWhiteSpace(city))
            {
                throw new ValidationException("City can not be empty.");
            }
            City = city;
        }

        public void SetCountry(string country)
        {
            if (string.IsNullOrWhiteSpace(country))
            {
                throw new ValidationException("Country can not be empty.");
            }
            Country = country;
        }

        public void SetPhone(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone))
            {
                throw new ValidationException("Phone can not be empty.");
            }
            Phone = phone;
        }
    }
}
