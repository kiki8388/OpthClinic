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
    public class DirectorServices : IDirectorServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher<Director> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;

        public DirectorServices(ApplicationDbContext dbContext, IPasswordHasher<Director> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public async Task CreateDirectorAsync(RegisterDirector command)
        {
            var newdirector = new Director(command.FirstName, command.LastName, command.Email, command.StreetName, command.BuildingNumber, command.PostalCode, command.City, command.Country, command.Phone, command.LicenseId);
            var hashedPassword = _passwordHasher.HashPassword(newdirector, command.Password);
            newdirector.PasswordHash = hashedPassword;
            newdirector.Role = _dbContext.Roles.FirstOrDefault(r => r.Id == newdirector.RoleId);
            await _dbContext.AddAsync(newdirector);
            await _dbContext.SaveChangesAsync();
        }

        public string GenerateJwt(LoginUser command)
        {
            var director = _dbContext.Directors
                .Include(d => d.Role)
                .FirstOrDefault(u => u.Email == command.Email);
            if (director is null)
            {
                throw new NotFoundException("Email doesn't exist");
            }

            var result = _passwordHasher.VerifyHashedPassword(director, director.PasswordHash, command.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new NotFoundException("Incorrect password");
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,director.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{director.FirstName} {director.LastName}"),
                new Claim("LicenseId", director.LicenseId),
                new Claim(ClaimTypes.Role, $"{director.Role.Name}")
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

        public async Task<Director> GetDirector(Guid directorId)
        {
            return await _dbContext.Directors.FirstOrDefaultAsync(u => u.Id == directorId);
        }

        public async Task ChangeDirectorPassword(ChangeUserPassword command)
        {
            var director = await GetDirector(command.userId);
            if (command.Password == command.ConfirmPassword)
            {
                var hashedPassword = _passwordHasher.HashPassword(director, command.Password);
                director.PasswordHash = hashedPassword;
            }
            else
                throw new ValidationException("Passwords don't match");
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditDirectorData(EditWorkerData command)
        {
            var director = await GetDirector(command.WorkerId);

            director.FirstName = command.FirstName;
            director.LastName = command.LastName;
            director.Email = command.Email;
            director.StreetName = command.StreetName;
            director.BuildingNumber = command.BuildingNumber;
            director.PostalCode = command.PostalCode;
            director.City = command.City;
            director.Country = command.Country;
            director.Phone = command.Phone;
            director.LicenseId = command.LicenseId;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteDirector(Guid directorId)
        {
            var director = await _dbContext.Directors.FirstOrDefaultAsync(d => d.Id == directorId);
            if (director is null)
                throw new NotFoundException("This director doesn't exist");

            _dbContext.Directors.Remove(director);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<DirectorDto> GetAllDirectors()
        {
            var directors = _dbContext
               .Directors
               .OrderBy(l => l.LastName)
               .ToList();

            var directorsDto = directors.Select(n => new DirectorDto
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

            return directorsDto;
        }

        public IEnumerable<DirectorDto> GetAllDirectorsBasicData()
        {
            var directors = _dbContext
               .Directors
               .OrderBy(l => l.LastName)
               .ToList();

            var directorsDto = directors.Select(n => new DirectorDto
            {
                Id = n.Id,
                FirstName = n.FirstName,
                LastName = n.LastName,
                Email = n.Email
            }).ToList();

            return directorsDto;
        }

        public DirectorDto GetDirectorProfile(Guid directorId)
        {
            var director = _dbContext.Directors.FirstOrDefault(u => u.Id == directorId);

            var directorDto = new DirectorDto
            {
                Id = director.Id,
                FirstName = director.FirstName,
                LastName = director.LastName,
                Email = director.Email,
                StreetName = director.StreetName,
                BuildingNumber = director.BuildingNumber,
                PostalCode = director.PostalCode,
                City = director.City,
                Country = director.Country,
                Phone = director.Phone,
                LicenseId = director.LicenseId
            };


            return directorDto;
        }
    }
}
