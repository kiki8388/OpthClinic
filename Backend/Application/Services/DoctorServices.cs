using Application.Commands;
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
    public class DoctorServices : IDoctorServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher<Doctor> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;

        public DoctorServices(ApplicationDbContext dbContext, IPasswordHasher<Doctor> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public async Task CreateDoctorAsync(RegisterDoctor command)
        {
            var newdoctor = new Doctor(command.FirstName, command.LastName, command.Email, command.StreetName, command.BuildingNumber, command.PostalCode, command.City, command.Country, command.Phone, command.LicenseId);
            var hashedPassword = _passwordHasher.HashPassword(newdoctor, command.Password);
            newdoctor.PasswordHash = hashedPassword;
            newdoctor.Role = _dbContext.Roles.FirstOrDefault(r => r.Id == newdoctor.RoleId);
            await _dbContext.AddAsync(newdoctor);
            await _dbContext.SaveChangesAsync();
        }

        public string GenerateJwt(LoginUser command)
        {
            var doctor = _dbContext.Doctors
                .Include(d => d.Role)
                .FirstOrDefault(u => u.Email == command.Email);

            if (doctor is null)
            {
                throw new NotFoundException("Email doesn't exist");
            }

            var result = _passwordHasher.VerifyHashedPassword(doctor, doctor.PasswordHash, command.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new NotFoundException("Incorrect password");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,doctor.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{doctor.FirstName} {doctor.LastName}"),
                new Claim("LicenseId", doctor.LicenseId),
                new Claim(ClaimTypes.Role, $"{doctor.Role.Name}")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddHours(_authenticationSettings.JwtExpireHours);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        public async Task<Doctor> GetDoctor(Guid doctorId)
        {
            return await _dbContext.Doctors.FirstOrDefaultAsync(u => u.Id == doctorId);
        }

        public async Task<Doctor> GetDoctorByEmail(string email)
        {
            return await _dbContext.Doctors.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task ChangeDoctorPassword(ChangeUserPassword command)
        {
            var doctor = await GetDoctor(command.userId);
            if (command.Password == command.ConfirmPassword)
            {
                var hashedPassword = _passwordHasher.HashPassword(doctor, command.Password);
                doctor.PasswordHash = hashedPassword;
            }
            else
                throw new ValidationException("Passwords don't match");
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditDoctorData(EditWorkerData command)
        {
            var doctor = await GetDoctor(command.WorkerId);

            doctor.FirstName = command.FirstName;
            doctor.LastName = command.LastName;
            doctor.Email = command.Email;
            doctor.StreetName = command.StreetName;
            doctor.BuildingNumber = command.BuildingNumber;
            doctor.PostalCode = command.PostalCode;
            doctor.City = command.City;
            doctor.Country = command.Country;
            doctor.Phone = command.Phone;
            doctor.LicenseId = command.LicenseId;

            await _dbContext.SaveChangesAsync();
        }

        public async Task EditDoctorAboutInfo(EditDoctorAboutInfo command)
        {
            var doctor = await GetDoctor(command.DoctorId);

            doctor.About = command.About;

            await _dbContext.SaveChangesAsync();
        }

        public async Task<DoctorDto> GetDoctorPublic(Guid doctorId)
        {
            var doctor = await GetDoctor(doctorId);
            var doctorDto = new DoctorDto
            {
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                About = doctor.About,
                Email = doctor.Email,
                City = doctor.City,
                Country = doctor.Country,
                Phone = doctor.Phone
            };
            return doctorDto;
        }

        public IEnumerable<DoctorDto> GetAllDoctors()
        {
            var doctors = _dbContext
               .Doctors
               .Include(p => p.PatientsList)
               .OrderBy(l => l.LastName)
               .ToList();

            var doctorsDto = doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                About = d.About,
                LicenseId = d.LicenseId,
                Email = d.Email,
                Phone = d.Phone,
                StreetName = d.StreetName,
                BuildingNumber = d.BuildingNumber,
                PostalCode = d.PostalCode,
                City = d.City,
                Country = d.Country
            }).ToList();

            return doctorsDto;
        }

        public IEnumerable<DoctorDto> GetAllDoctorsForPatient()
        {
            var doctors = _dbContext
               .Doctors
               .OrderBy(l => l.LastName)
               .ToList();

            var doctorsDto = doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                About = d.About,
                Email = d.Email,
                City = d.City,
                Country = d.Country
            }).ToList();

            return doctorsDto;
        }

        public IEnumerable<DoctorDto> GetAllDoctorsBasicData()
        {
            var doctors = _dbContext
               .Doctors
               .OrderBy(l => l.LastName)
               .ToList();

            var doctorsDto = doctors.Select(d => new DoctorDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                Email = d.Email
            }).ToList();

            return doctorsDto;
        }

        public async Task DeleteDoctor(Guid doctorId)
        {
            var doctor = await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Id == doctorId);
            if (doctor is null)
                throw new NotFoundException("This doctor doesn't exist");

            _dbContext.Doctors.Remove(doctor);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<DoctorVisitDto> GetAllDoctorsVisit()
        {
            var doctors = _dbContext
               .Doctors
               .OrderBy(l => l.LastName)
               .ToList();

            var doctorsDto = doctors.Select(d => new DoctorVisitDto
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName
            }).ToList();

            return doctorsDto;
        }

        public DoctorDto GetDoctorProfile(Guid doctorId)
        {
            var doctor = _dbContext.Doctors.FirstOrDefault(u => u.Id == doctorId);

            var doctorDto = new DoctorDto
            {
                Id = doctor.Id,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                About = doctor.About,
                Email = doctor.Email,
                StreetName = doctor.StreetName,
                BuildingNumber = doctor.BuildingNumber,
                PostalCode = doctor.PostalCode,
                City = doctor.City,
                Country = doctor.Country,
                Phone = doctor.Phone,
                LicenseId = doctor.LicenseId
            };


            return doctorDto;
        }
    }
}
