using Application.Commands;
using Application.Dto;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IVisitServices
    {
        Task CreateVisit(CreateVisit command);
        Task CreateVisitByPatient(CreateVisitByPatient command);
        Task DeleteVisitByNurse(Guid visitId);
        Task DeleteVisit(DeleteVisit command);
        Task EditVisit(EditVisit command);
        Task EditVisitByNurse(EditVisitByNurse command);
        Task<Visit> GetVisitById(Guid visitId);
        IEnumerable<VisitDto> GetAllVisits(Guid userId);
        Task DeleteVisit(Guid visitId);
        Task<VisitDto> GetVisit(Guid visitId);
    }
}