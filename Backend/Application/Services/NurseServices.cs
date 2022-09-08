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
    public class NurseServices : INurseServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher<Nurse> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;

        public NurseServices(ApplicationDbContext dbContext, IPasswordHasher<Nurse> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public async Task CreateNurseAsync(RegisterNurse command)
        {
            var newnurse = new Nurse(command.FirstName, command.LastName, command.Email, command.StreetName, command.BuildingNumber, command.PostalCode, command.City, command.Country, command.Phone, command.LicenseId);
            var hashedPassword = _passwordHasher.HashPassword(newnurse, command.Password);
            newnurse.PasswordHash = hashedPassword;
            newnurse.Role = _dbContext.Roles.FirstOrDefault(r => r.Id == newnurse.RoleId);
            await _dbContext.AddAsync(newnurse);
            await _dbContext.SaveChangesAsync();
        }

        public string GenerateJwt(LoginUser command)
        {
            var nurse = _dbContext.Nurses
                .Include(n => n.Role)
                .FirstOrDefault(u => u.Email == command.Email);

            if (nurse is null)
            {
                throw new NotFoundException("Email doesn't exist");
            }

            var result = _passwordHasher.VerifyHashedPassword(nurse, nurse.PasswordHash, command.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new NotFoundException("Incorrect password");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,nurse.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{nurse.FirstName} {nurse.LastName}"),
                new Claim("LicenseId", nurse.LicenseId),
                new Claim(ClaimTypes.Role, $"{nurse.Role.Name}")
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

        public async Task<Nurse> GetNurse(Guid nurseId)
        {
            return await _dbContext.Nurses.FirstOrDefaultAsync(u => u.Id == nurseId);
        }

        public async Task ChangeNursePassword(ChangeUserPassword command)
        {

            var nurse = await GetNurse(command.userId);
            if (command.Password == command.ConfirmPassword)
            {
                var hashedPassword = _passwordHasher.HashPassword(nurse, command.Password);
                nurse.PasswordHash = hashedPassword;
            }
            else
                throw new ValidationException("Passwords don't match");
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditNurseData(EditWorkerData command)
        {
            var nurse = await GetNurse(command.WorkerId);

            nurse.FirstName = command.FirstName;
            nurse.LastName = command.LastName;
            nurse.Email = command.Email;
            nurse.StreetName = command.StreetName;
            nurse.BuildingNumber = command.BuildingNumber;
            nurse.PostalCode = command.PostalCode;
            nurse.City = command.City;
            nurse.Country = command.Country;
            nurse.Phone = command.Phone;
            nurse.LicenseId = command.LicenseId;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteNurse(Guid nurseId)
        {
            var nurse = await _dbContext.Nurses.FirstOrDefaultAsync(n => n.Id == nurseId);
            if (nurse is null)
                throw new NotFoundException("This nurse doesn't exist");

            _dbContext.Nurses.Remove(nurse);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<NurseDto> GetAllNurses()
        {
            var nurses = _dbContext
               .Nurses
               .OrderBy(l => l.LastName)
               .ToList();

            var nursesDto = nurses.Select(n => new NurseDto
            {
                Id = n.Id,
                FirstName = n.FirstName,
                LastName = n.LastName,
                Email = n.Email,
                StreetName = n.StreetName,
                BuildingNumber = n.BuildingNumber,
                PostalCode = n.PostalCode,
                City = n.City,
                Country = n.Country,
                Phone = n.Phone,
                LicenseId = n.LicenseId
            }).ToList();

            return nursesDto;
        }

        public IEnumerable<NurseDto> GetAllNursesBasicData()
        {
            var nurses = _dbContext
               .Nurses
               .OrderBy(l => l.LastName)
               .ToList();

            var nursesDto = nurses.Select(n => new NurseDto
            {
                Id = n.Id,
                FirstName = n.FirstName,
                LastName = n.LastName,
                Email = n.Email
            }).ToList();

            return nursesDto;
        }

        public NurseDto GetNurseProfile(Guid nurseId)
        {
            var nurse = _dbContext.Nurses.FirstOrDefault(u => u.Id == nurseId);
            
                var nurseDto = new NurseDto
                {
                    Id = nurse.Id,
                    FirstName = nurse.FirstName,
                    LastName = nurse.LastName,
                    Email = nurse.Email,
                    StreetName = nurse.StreetName,
                    BuildingNumber = nurse.BuildingNumber,
                    PostalCode = nurse.PostalCode,
                    City = nurse.City,
                    Country = nurse.Country,
                    Phone = nurse.Phone,
                    LicenseId = nurse.LicenseId
                };
            

            return nurseDto;
        }
    }
}
