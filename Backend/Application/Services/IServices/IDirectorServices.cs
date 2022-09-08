using Application.Commands;
using Application.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IDirectorServices
    {
        Task ChangeDirectorPassword(ChangeUserPassword command);
        Task CreateDirectorAsync(RegisterDirector command);
        Task DeleteDirector(Guid directorId);
        Task EditDirectorData(EditWorkerData command);
        string GenerateJwt(LoginUser command);
        IEnumerable<DirectorDto> GetAllDirectors();
        IEnumerable<DirectorDto> GetAllDirectorsBasicData();
        Task<Director> GetDirector(Guid directorId);
        DirectorDto GetDirectorProfile(Guid directorId);
    }
}