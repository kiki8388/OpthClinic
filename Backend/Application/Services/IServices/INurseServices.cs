using Application.Commands;
using Application.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface INurseServices
    {
        Task ChangeNursePassword(ChangeUserPassword command);
        Task CreateNurseAsync(RegisterNurse command);
        Task DeleteNurse(Guid nurseId);
        Task EditNurseData(EditWorkerData command);
        string GenerateJwt(LoginUser command);
        IEnumerable<NurseDto> GetAllNurses();
        IEnumerable<NurseDto> GetAllNursesBasicData();
        Task<Nurse> GetNurse(Guid nurseId);
        NurseDto GetNurseProfile(Guid nurseId);
    }
}