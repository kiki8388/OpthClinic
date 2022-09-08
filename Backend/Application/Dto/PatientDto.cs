using System;

namespace Application.Dto
{
    public class PatientDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string BirthDate { get; set; }
        public DateTime EditBirthDate { get; set; }
        public int Age { get; set; }
        public string StreetName { get; set; }
        public string BuildingNumber { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Pesel { get; set; }
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
        public string Status{ get; set; }
        public Guid DoctorId { get; set; }
        public string DoctorFirstName { get; set; }
        public string DoctorLastName { get; set; }
        public string DoctorAboutInfo { get; set; }
        public string DoctorEmail { get; set; }
        public string DoctorPhone { get; set; }
        public string DoctorLicenseId { get; set; }
        public string DoctorStreetName { get; set; }
        public string DoctorBuildingNumber { get; set; }
        public string DoctorPostalCode { get; set; }
        public string DoctorCity { get; set; }
        public string DoctorCountry { get; set; }
        
    }
}
