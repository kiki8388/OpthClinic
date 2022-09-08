using Application.Commands;
using Application.Commands.Doctor;
using Application.Commands.Patient;
using Application.Dto;
using Domain.Common.Exceptions;
using Domain.Models;
using Infrastructure.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OpthClinicAPI;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class PatientServices : IPatientServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher<Patient> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IDoctorServices _doctorServices;

        public PatientServices(ApplicationDbContext dbContext, IPasswordHasher<Patient> passwordHasher, AuthenticationSettings authenticationSettings, IDoctorServices doctorServices)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
            _doctorServices = doctorServices;
        }

        public async Task CreatePatientAsync(RegisterPatient command)
        {
            var newpatient = new Patient(command.FirstName, command.LastName, command.Email, command.StreetName, command.BuildingNumber, command.PostalCode, command.City, command.Country, command.Phone, command.BirthDate, command.Pesel);
            var hashedPassword = _passwordHasher.HashPassword(newpatient, command.Password);
            newpatient.PasswordHash = hashedPassword;
            newpatient.Role = _dbContext.Roles.FirstOrDefault(r => r.Id == newpatient.RoleId);
            await _dbContext.AddAsync(newpatient);
            await _dbContext.SaveChangesAsync();
        }

        public string GenerateJwt(LoginUser command)
        {
            var patient = _dbContext.Patients
                .Include(p => p.Role)
                .FirstOrDefault(u => u.Email == command.Email);

            if (patient is null)
            {
                throw new NotFoundException("Email doesn't exist");
            }

            var result = _passwordHasher.VerifyHashedPassword(patient, patient.PasswordHash, command.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new NotFoundException("Incorrect password");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, patient.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{patient.FirstName} {patient.LastName}"),
                new Claim(ClaimTypes.Role, $"{patient.Role.Name}")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireHours);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        public async Task<Patient> GetPatientById(Guid patientId)
        {
            return await _dbContext.Patients.Include(p => p.MedicalHistory).Include(d => d.AssignedDoctor).FirstOrDefaultAsync(u => u.Id == patientId);
        }

        public async Task<PatientDto> GetCurrentPatient(Guid id)
        {
            var patient = await GetPatientById(id);
            var patientDto = new PatientDto
            {
                Id = patient.Id,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Email = patient.Email,
                BirthDate = patient.BirthDate.ToShortDateString(),
                EditBirthDate = patient.BirthDate,
                StreetName = patient.StreetName,
                BuildingNumber = patient.BuildingNumber,
                PostalCode = patient.PostalCode,
                City = patient.City,
                Country = patient.Country,
                Phone = patient.Phone,
                Pesel = patient.Pesel,
                Name = patient.MedicalHistory.Name,
                Description = patient.MedicalHistory.Description,
                DistReSphere = patient.MedicalHistory.DistReSphere,
                DistReCylinder = patient.MedicalHistory.DistReCylinder,
                DistReAxis = patient.MedicalHistory.DistReAxis,
                DistRePupilDistance = patient.MedicalHistory.DistRePupilDistance,
                DistLeSphere = patient.MedicalHistory.DistLeSphere,
                DistLeCylinder = patient.MedicalHistory.DistLeCylinder,
                DistLeAxis = patient.MedicalHistory.DistLeAxis,
                DistLePupilDistance = patient.MedicalHistory.DistLePupilDistance,
                CloseReSphere = patient.MedicalHistory.CloseReSphere,
                CloseReCylinder = patient.MedicalHistory.CloseReCylinder,
                CloseReAxis = patient.MedicalHistory.CloseReAxis,
                CloseRePupilDistance = patient.MedicalHistory.CloseRePupilDistance,
                CloseLeSphere = patient.MedicalHistory.CloseLeSphere,
                CloseLeCylinder = patient.MedicalHistory.CloseLeCylinder,
                CloseLeAxis = patient.MedicalHistory.CloseLeAxis,
                CloseLePupilDistance = patient.MedicalHistory.CloseLePupilDistance,
                Recommendations = patient.MedicalHistory.Recommendations,
                Status = patient.MedicalHistory.Status,
                DoctorId = patient.AssignedDoctor.Id,
                DoctorFirstName = patient.AssignedDoctor.FirstName,
                DoctorLastName = patient.AssignedDoctor.LastName,
                DoctorEmail = patient.AssignedDoctor.Email,
                DoctorPhone = patient.AssignedDoctor.Phone,
                DoctorAboutInfo = patient.AssignedDoctor.About,
                DoctorCity = patient.AssignedDoctor.City,
                DoctorCountry = patient.AssignedDoctor.Country
            };
            return patientDto;
        }

        public async Task<Patient> GetPatient(string pesel)
        {
            return await _dbContext.Patients.Include(p => p.MedicalHistory).Include(d => d.AssignedDoctor).FirstOrDefaultAsync(u => u.Pesel == pesel);
        }

        public async Task<PatientDto> GetPatientPublic(string pesel)
        {
            var patient = await GetPatient(pesel);
            var patientDto = new PatientDto
            {
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                Email = patient.Email,
                BirthDate = patient.BirthDate.ToShortDateString(),
                StreetName = patient.StreetName,
                BuildingNumber = patient.BuildingNumber,
                PostalCode = patient.PostalCode,
                City = patient.City,
                Country = patient.Country,
                Phone = patient.Phone,
                Pesel = patient.Pesel
            };
            return patientDto;
        }

        public async Task ChangePatientPassword(ChangeUserPassword command)
        {
            var patient = await GetPatientById(command.userId);
            if (command.Password == command.ConfirmPassword)
            {
                var hashedPassword = _passwordHasher.HashPassword(patient, command.Password);
                patient.PasswordHash = hashedPassword;
            }
            else
                throw new ValidationException("Passwords don't match");
            await _dbContext.SaveChangesAsync();
        }

        public async Task AssignPatient(AssignPatient command)
        {
            var patient = await GetPatientById(command.PatientId);
            if (patient is null)
                throw new NotFoundException("Patient with this id doesn't exist");
            var doctor = await _doctorServices.GetDoctor(command.DoctorId);
            doctor.AddPatientToList(patient);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UnassignPatient(AssignPatient command)
        {
            var patient = await GetPatientById(command.PatientId);
            if (patient is null)
                throw new NotFoundException("Patient with this id doesn't exist");
            var doctor = await _doctorServices.GetDoctor(command.DoctorId);
            doctor.RemovePatientFromList(patient);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<PatientDto> GetAssignedPatients(Guid doctorId)
        {
            var patients = _dbContext.Patients.Include(m => m.MedicalHistory).Where(d => d.AssignedDoctor.Id == doctorId).OrderBy(l => l.LastName).IgnoreAutoIncludes();

            var patientsDto = patients.Select(p => new PatientDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Pesel = p.Pesel,
                Email = p.Email,
                BirthDate = p.BirthDate.ToShortDateString(),
                EditBirthDate = p.BirthDate,
                StreetName = p.StreetName,
                BuildingNumber = p.BuildingNumber,
                PostalCode = p.PostalCode,
                City = p.City,
                Country = p.Country,
                Phone = p.Phone,
                Name = p.MedicalHistory.Name,
                Description = p.MedicalHistory.Description,
                Recommendations = p.MedicalHistory.Recommendations,
                Status = p.MedicalHistory.Status,
                DoctorFirstName = p.AssignedDoctor.FirstName,
                DoctorLastName = p.AssignedDoctor.LastName
            }).ToList();

            return patientsDto;
        }

        public async Task EditMedicalHistoryNurse(EditMedicalHistory command)
        {
            var patient = await GetPatientById(command.PatientId);

            patient.MedicalHistory.Name = command.Name;
            patient.MedicalHistory.Description = command.Description;
            patient.MedicalHistory.DistReSphere = command.DistReSphere;
            patient.MedicalHistory.DistReCylinder = command.DistReCylinder;
            patient.MedicalHistory.DistReAxis = command.DistReAxis;
            patient.MedicalHistory.DistRePupilDistance = command.DistRePupilDistance;
            patient.MedicalHistory.DistLeSphere = command.DistLeSphere;
            patient.MedicalHistory.DistLeCylinder = command.DistLeCylinder;
            patient.MedicalHistory.DistLeAxis = command.DistLeAxis;
            patient.MedicalHistory.DistLePupilDistance = command.DistLePupilDistance;
            patient.MedicalHistory.CloseReSphere = command.CloseReSphere;
            patient.MedicalHistory.CloseReCylinder = command.CloseReCylinder;
            patient.MedicalHistory.CloseReAxis = command.CloseReAxis;
            patient.MedicalHistory.CloseRePupilDistance = command.CloseRePupilDistance;
            patient.MedicalHistory.CloseLeSphere = command.CloseLeSphere;
            patient.MedicalHistory.CloseLeCylinder = command.CloseLeCylinder;
            patient.MedicalHistory.CloseLeAxis = command.CloseLeAxis;
            patient.MedicalHistory.CloseLePupilDistance = command.CloseLePupilDistance;
            patient.MedicalHistory.Recommendations = command.Recommendations;
            patient.MedicalHistory.Status = "Unapproved";

            await _dbContext.SaveChangesAsync();
        }

        public async Task EditMedicalHistoryDoctor(EditMedicalHistory command)
        {
            var patient = await GetPatientById(command.PatientId);

            patient.MedicalHistory.Name = command.Name;
            patient.MedicalHistory.Description = command.Description;
            patient.MedicalHistory.DistReSphere = command.DistReSphere;
            patient.MedicalHistory.DistReCylinder = command.DistReCylinder;
            patient.MedicalHistory.DistReAxis = command.DistReAxis;
            patient.MedicalHistory.DistRePupilDistance = command.DistRePupilDistance;
            patient.MedicalHistory.DistLeSphere = command.DistLeSphere;
            patient.MedicalHistory.DistLeCylinder = command.DistLeCylinder;
            patient.MedicalHistory.DistLeAxis = command.DistLeAxis;
            patient.MedicalHistory.DistLePupilDistance = command.DistLePupilDistance;
            patient.MedicalHistory.CloseReSphere = command.CloseReSphere;
            patient.MedicalHistory.CloseReCylinder = command.CloseReCylinder;
            patient.MedicalHistory.CloseReAxis = command.CloseReAxis;
            patient.MedicalHistory.CloseRePupilDistance = command.CloseRePupilDistance;
            patient.MedicalHistory.CloseLeSphere = command.CloseLeSphere;
            patient.MedicalHistory.CloseLeCylinder = command.CloseLeCylinder;
            patient.MedicalHistory.CloseLeAxis = command.CloseLeAxis;
            patient.MedicalHistory.CloseLePupilDistance = command.CloseLePupilDistance;
            patient.MedicalHistory.Recommendations = command.Recommendations;
            patient.MedicalHistory.Status = "Approved";

            await _dbContext.SaveChangesAsync();
        }

        public async Task EditPatientData(EditPatientData command)
        {
            var patient = await GetPatientById(command.PatientId);

            patient.FirstName = command.FirstName;
            patient.LastName = command.LastName;
            patient.Email = command.Email;
            patient.BirthDate = command.EditBirthDate;
            patient.StreetName = command.StreetName;
            patient.BuildingNumber = command.BuildingNumber;
            patient.PostalCode = command.PostalCode;
            patient.City = command.City;
            patient.Country = command.Country;
            patient.Phone = command.Phone;
            patient.Pesel = command.Pesel;

            await _dbContext.SaveChangesAsync();
        }

        public async Task<DoctorDto> GetAssignedDoctor(Guid patientId)
        {
            var patient = await GetPatientById(patientId);
            var doctor = await _doctorServices.GetDoctorPublic(patient.AssignedDoctor.Id);
            return doctor;
        }

        public async Task DeletePatient(Guid patientId)
        {
            var patient = await _dbContext
                .Patients
                .Include(m => m.MedicalHistory)
                .FirstOrDefaultAsync(p => p.Id == patientId);
            if (patient is null)
                throw new NotFoundException("This patient doesn't exist");
            _dbContext.MedicalHistory.Remove(patient.MedicalHistory);
            _dbContext.Patients.Remove(patient);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<PatientDto> GetAllPatients()
        {
            var patients = _dbContext
               .Patients
               .Include(p => p.MedicalHistory)
               .Include(d => d.AssignedDoctor)
               .OrderBy(l => l.LastName)
               .ToList();

            var patientsDtoWithDoctor = patients.Where(p => p.AssignedDoctor != null).Select(p => new PatientDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Email = p.Email,
                BirthDate = p.BirthDate.ToShortDateString(),
                EditBirthDate = p.BirthDate.Date,
                Age = (int)((DateTime.Now - p.BirthDate).TotalDays / 365.242199),
                StreetName = p.StreetName,
                BuildingNumber = p.BuildingNumber,
                PostalCode = p.PostalCode,
                City = p.City,
                Country = p.Country,
                Phone = p.Phone,
                Pesel = p.Pesel,
                Name = p.MedicalHistory.Name,
                Description = p.MedicalHistory.Description,
                DistReSphere = p.MedicalHistory.DistReSphere,
                DistReCylinder = p.MedicalHistory.DistReCylinder,
                DistReAxis = p.MedicalHistory.DistReAxis,
                DistRePupilDistance = p.MedicalHistory.DistRePupilDistance,
                DistLeSphere = p.MedicalHistory.DistLeSphere,
                DistLeCylinder = p.MedicalHistory.DistLeCylinder,
                DistLeAxis = p.MedicalHistory.DistLeAxis,
                DistLePupilDistance = p.MedicalHistory.DistLePupilDistance,
                CloseReSphere = p.MedicalHistory.CloseReSphere,
                CloseReCylinder = p.MedicalHistory.CloseReCylinder,
                CloseReAxis = p.MedicalHistory.CloseReAxis,
                CloseRePupilDistance = p.MedicalHistory.CloseRePupilDistance,
                CloseLeSphere = p.MedicalHistory.CloseLeSphere,
                CloseLeCylinder = p.MedicalHistory.CloseLeCylinder,
                CloseLeAxis = p.MedicalHistory.CloseLeAxis,
                CloseLePupilDistance = p.MedicalHistory.CloseLePupilDistance,
                Recommendations = p.MedicalHistory.Recommendations,
                Status = p.MedicalHistory.Status,
                DoctorId = p.AssignedDoctor.Id,
                DoctorFirstName = p.AssignedDoctor.FirstName,
                DoctorLastName = p.AssignedDoctor.LastName,
                DoctorEmail = p.AssignedDoctor.Email,
                DoctorPhone = p.AssignedDoctor.Phone,
                DoctorAboutInfo = p.AssignedDoctor.About,
                DoctorCity = p.AssignedDoctor.City,
                DoctorCountry = p.AssignedDoctor.Country
            }).ToList();

            var patientsDto = patients.Where(p => p.AssignedDoctor == null).Select(p => new PatientDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                Email = p.Email,
                BirthDate = p.BirthDate.ToShortDateString(),
                EditBirthDate = p.BirthDate.Date,
                Age = (int)((DateTime.Now - p.BirthDate).TotalDays / 365.242199),
                StreetName = p.StreetName,
                BuildingNumber = p.BuildingNumber,
                PostalCode = p.PostalCode,
                City = p.City,
                Country = p.Country,
                Phone = p.Phone,
                Pesel = p.Pesel,
                Name = p.MedicalHistory.Name,
                Description = p.MedicalHistory.Description,
                DistReSphere = p.MedicalHistory.DistReSphere,
                DistReCylinder = p.MedicalHistory.DistReCylinder,
                DistReAxis = p.MedicalHistory.DistReAxis,
                DistRePupilDistance = p.MedicalHistory.DistRePupilDistance,
                DistLeSphere = p.MedicalHistory.DistLeSphere,
                DistLeCylinder = p.MedicalHistory.DistLeCylinder,
                DistLeAxis = p.MedicalHistory.DistLeAxis,
                DistLePupilDistance = p.MedicalHistory.DistLePupilDistance,
                CloseReSphere = p.MedicalHistory.CloseReSphere,
                CloseReCylinder = p.MedicalHistory.CloseReCylinder,
                CloseReAxis = p.MedicalHistory.CloseReAxis,
                CloseRePupilDistance = p.MedicalHistory.CloseRePupilDistance,
                CloseLeSphere = p.MedicalHistory.CloseLeSphere,
                CloseLeCylinder = p.MedicalHistory.CloseLeCylinder,
                CloseLeAxis = p.MedicalHistory.CloseLeAxis,
                CloseLePupilDistance = p.MedicalHistory.CloseLePupilDistance,
                Recommendations = p.MedicalHistory.Recommendations,
                Status = p.MedicalHistory.Status
            }).ToList();

            var result = patientsDto.Concat(patientsDtoWithDoctor).OrderBy(l => l.LastName).ToList();

            return result;
        }

        public async Task<MedicalHistory> GetMedicalHistoryPatient(GetMedicalHistoryPatient command)
        {
            if (command.PatientId != command.CurrentUserId)
                throw new NotAllowedException("You don't have permission!");
            var patient = await _dbContext.Patients.Include(p => p.MedicalHistory).Include(d => d.AssignedDoctor).FirstOrDefaultAsync(u => u.Id == command.PatientId);

            return patient.MedicalHistory;
        }

        public async Task<MedicalHistory> GetMedicalHistory(Guid patientId)
        {
            var patient = await _dbContext.Patients.Include(p => p.MedicalHistory).Include(d => d.AssignedDoctor).FirstOrDefaultAsync(u => u.Id == patientId);

            return patient.MedicalHistory;
        }

        public IEnumerable<PatientVisitDto> GetAllPatientsVisit()
        {
            var patients = _dbContext
               .Patients
               .ToList();

            var patientsDto = patients.Select(p => new PatientVisitDto
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName
            }).ToList();

            return patientsDto;
        }

        public PatientDto GetPatientProfile(Guid patientId)
        {
            var patient = _dbContext.Patients.Include(p => p.MedicalHistory).Include(d => d.AssignedDoctor).FirstOrDefault(u => u.Id == patientId);
            var patientDto = new PatientDto();
            if (patient.AssignedDoctor == null)
            {
                patientDto = new PatientDto
                {
                    Id = patient.Id,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    Email = patient.Email,
                    BirthDate = patient.BirthDate.ToShortDateString(),
                    EditBirthDate = patient.BirthDate.Date,
                    Age = (int)((DateTime.Now - patient.BirthDate).TotalDays / 365.242199),
                    StreetName = patient.StreetName,
                    BuildingNumber = patient.BuildingNumber,
                    PostalCode = patient.PostalCode,
                    City = patient.City,
                    Country = patient.Country,
                    Phone = patient.Phone,
                    Pesel = patient.Pesel,
                    Name = patient.MedicalHistory.Name,
                    Description = patient.MedicalHistory.Description,
                    DistReSphere = patient.MedicalHistory.DistReSphere,
                    DistReCylinder = patient.MedicalHistory.DistReCylinder,
                    DistReAxis = patient.MedicalHistory.DistReAxis,
                    DistRePupilDistance = patient.MedicalHistory.DistRePupilDistance,
                    DistLeSphere = patient.MedicalHistory.DistLeSphere,
                    DistLeCylinder = patient.MedicalHistory.DistLeCylinder,
                    DistLeAxis = patient.MedicalHistory.DistLeAxis,
                    DistLePupilDistance = patient.MedicalHistory.DistLePupilDistance,
                    CloseReSphere = patient.MedicalHistory.CloseReSphere,
                    CloseReCylinder = patient.MedicalHistory.CloseReCylinder,
                    CloseReAxis = patient.MedicalHistory.CloseReAxis,
                    CloseRePupilDistance = patient.MedicalHistory.CloseRePupilDistance,
                    CloseLeSphere = patient.MedicalHistory.CloseLeSphere,
                    CloseLeCylinder = patient.MedicalHistory.CloseLeCylinder,
                    CloseLeAxis = patient.MedicalHistory.CloseLeAxis,
                    CloseLePupilDistance = patient.MedicalHistory.CloseLePupilDistance,
                    Recommendations = patient.MedicalHistory.Recommendations,
                    Status = patient.MedicalHistory.Status
                };
            }
            else
            {
                patientDto = new PatientDto
                {
                    Id = patient.Id,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    Email = patient.Email,
                    BirthDate = patient.BirthDate.ToShortDateString(),
                    EditBirthDate = patient.BirthDate.Date,
                    Age = (int)((DateTime.Now - patient.BirthDate).TotalDays / 365.242199),
                    StreetName = patient.StreetName,
                    BuildingNumber = patient.BuildingNumber,
                    PostalCode = patient.PostalCode,
                    City = patient.City,
                    Country = patient.Country,
                    Phone = patient.Phone,
                    Pesel = patient.Pesel,
                    Name = patient.MedicalHistory.Name,
                    Description = patient.MedicalHistory.Description,
                    DistReSphere = patient.MedicalHistory.DistReSphere,
                    DistReCylinder = patient.MedicalHistory.DistReCylinder,
                    DistReAxis = patient.MedicalHistory.DistReAxis,
                    DistRePupilDistance = patient.MedicalHistory.DistRePupilDistance,
                    DistLeSphere = patient.MedicalHistory.DistLeSphere,
                    DistLeCylinder = patient.MedicalHistory.DistLeCylinder,
                    DistLeAxis = patient.MedicalHistory.DistLeAxis,
                    DistLePupilDistance = patient.MedicalHistory.DistLePupilDistance,
                    CloseReSphere = patient.MedicalHistory.CloseReSphere,
                    CloseReCylinder = patient.MedicalHistory.CloseReCylinder,
                    CloseReAxis = patient.MedicalHistory.CloseReAxis,
                    CloseRePupilDistance = patient.MedicalHistory.CloseRePupilDistance,
                    CloseLeSphere = patient.MedicalHistory.CloseLeSphere,
                    CloseLeCylinder = patient.MedicalHistory.CloseLeCylinder,
                    CloseLeAxis = patient.MedicalHistory.CloseLeAxis,
                    CloseLePupilDistance = patient.MedicalHistory.CloseLePupilDistance,
                    Recommendations = patient.MedicalHistory.Recommendations,
                    Status = patient.MedicalHistory.Status,
                    DoctorId = patient.AssignedDoctor.Id,
                    DoctorFirstName = patient.AssignedDoctor.FirstName,
                    DoctorLastName = patient.AssignedDoctor.LastName,
                    DoctorEmail = patient.AssignedDoctor.Email,
                    DoctorPhone = patient.AssignedDoctor.Phone,
                    DoctorAboutInfo = patient.AssignedDoctor.About,
                    DoctorCity = patient.AssignedDoctor.City,
                    DoctorCountry = patient.AssignedDoctor.Country
                };
            }

            return patientDto;
        }
    }
}
