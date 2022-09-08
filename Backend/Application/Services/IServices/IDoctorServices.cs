using Application.Commands;
using Application.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IDoctorServices
    {
        Task ChangeDoctorPassword(ChangeUserPassword command);
        Task CreateDoctorAsync(RegisterDoctor command);
        Task DeleteDoctor(Guid doctorId);
        Task EditDoctorAboutInfo(EditDoctorAboutInfo command);
        Task EditDoctorData(EditWorkerData command);
        string GenerateJwt(LoginUser command);
        IEnumerable<DoctorDto> GetAllDoctors();
        IEnumerable<DoctorDto> GetAllDoctorsBasicData();
        IEnumerable<DoctorDto> GetAllDoctorsForPatient();
        IEnumerable<DoctorVisitDto> GetAllDoctorsVisit();
        Task<Doctor> GetDoctor(Guid doctorId);
        Task<Doctor> GetDoctorByEmail(string email);
        DoctorDto GetDoctorProfile(Guid doctorId);
        Task<DoctorDto> GetDoctorPublic(Guid doctorId);
    }
}