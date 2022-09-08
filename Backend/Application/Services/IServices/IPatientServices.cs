using Application.Commands;
using Application.Commands.Doctor;
using Application.Commands.Patient;
using Application.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IPatientServices
    {
        Task AssignPatient(AssignPatient command);
        Task ChangePatientPassword(ChangeUserPassword command);
        Task CreatePatientAsync(RegisterPatient command);
        Task DeletePatient(Guid patientId);
        Task EditMedicalHistoryDoctor(EditMedicalHistory command);
        Task EditMedicalHistoryNurse(EditMedicalHistory command);
        Task EditPatientData(EditPatientData command);
        string GenerateJwt(LoginUser command);
        IEnumerable<PatientDto> GetAllPatients();
        IEnumerable<PatientVisitDto> GetAllPatientsVisit();
        Task<DoctorDto> GetAssignedDoctor(Guid patientId);
        IEnumerable<PatientDto> GetAssignedPatients(Guid doctorId);
        Task<PatientDto> GetCurrentPatient(Guid id);
        Task<MedicalHistory> GetMedicalHistory(Guid patientId);
        Task<MedicalHistory> GetMedicalHistoryPatient(GetMedicalHistoryPatient command);
        Task<Patient> GetPatient(string pesel);
        Task<Patient> GetPatientById(Guid patientId);
        PatientDto GetPatientProfile(Guid patientId);
        Task<PatientDto> GetPatientPublic(string pesel);
        Task UnassignPatient(AssignPatient command);
    }
}