using Application.Commands;
using Application.Dto;
using Domain.Common.Exceptions;
using Domain.Models;
using Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Services
{
    public class VisitServices : IVisitServices
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPatientServices _patientServices;
        private readonly IDoctorServices _doctorServices;

        public VisitServices(ApplicationDbContext dbContext, IPatientServices patientServices, IDoctorServices doctorServices)
        {
            _dbContext = dbContext;
            _patientServices = patientServices;
            _doctorServices = doctorServices;
        }

        public async Task CreateVisit(CreateVisit command)
        {
            var existingVisit = _dbContext.Visits.FirstOrDefault(v => v.Date == command.Date && v.Room == command.Room);
            if (!(existingVisit is null))
                throw new AlreadyExistException("Visit has already been booked in the specified room on this date");

            var busyDoctor = _dbContext.Visits.FirstOrDefault(d => d.Doctor.Id == command.DoctorId && d.Date == command.Date);
            if (!(busyDoctor is null))
                throw new AlreadyExistException("This doctor already has a visit on this date");

            var busyPatient = _dbContext.Visits.FirstOrDefault(p => p.Patient.Id == command.PatientId && p.Date == command.Date);
            if (!(busyPatient is null))
                throw new AlreadyExistException("This patient already has a visit on this date");

            var patient = await _patientServices.GetPatientById(command.PatientId);
            var doctor = await _doctorServices.GetDoctor(command.DoctorId);
            var visit = new Visit(patient, doctor, command.Date, command.Room, command.Type, command.Duration);
            await _dbContext.AddAsync(visit);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CreateVisitByPatient(CreateVisitByPatient command)
        {
            var existingVisit = _dbContext.Visits.FirstOrDefault(v => v.Date == command.Date && v.Room == command.Room);
            if (!(existingVisit is null))
                throw new AlreadyExistException("Visit has already been booked in the specified room on this date");

            var busyDoctor = _dbContext.Visits.FirstOrDefault(d => d.Doctor.Id == command.DoctorId && d.Date == command.Date);
            if (!(busyDoctor is null))
                throw new AlreadyExistException("This doctor already has a visit on this date");

            var busyPatient = _dbContext.Visits.FirstOrDefault(p => p.Patient.Id == command.PatientId && p.Date == command.Date);
            if (!(busyPatient is null))
                throw new AlreadyExistException("This patient already has a visit on this date");

            var patient = await _patientServices.GetPatientById(command.PatientId);
            var doctor = await _doctorServices.GetDoctor(command.DoctorId);
            var visit = new Visit(patient, doctor, command.Date, command.Room, command.Type, command.Duration);
            await _dbContext.AddAsync(visit);
            await _dbContext.SaveChangesAsync();
        }

        public async Task EditVisitByNurse(EditVisitByNurse command)
        {
            var visit = _dbContext.Visits.Include(d => d.Doctor).Include(p => p.Patient).FirstOrDefault(v => v.Id == command.VisitId);
            if (visit is null)
                throw new NotFoundException("Visit doesn't exist");

            var existingVisit = _dbContext.Visits.FirstOrDefault(v => v.Date == command.Date && v.Room == command.Room);
            if (!(existingVisit is null))
                throw new AlreadyExistException("Visit has already been booked in the specified room on this date");

            var busyDoctor = _dbContext.Visits.FirstOrDefault(d => d.Doctor.Id == visit.Doctor.Id && d.Date == command.Date);
            if (!(busyDoctor is null))
                throw new AlreadyExistException("This doctor already has a visit on this date");

            var busyPatient = _dbContext.Visits.FirstOrDefault(p => p.Patient.Pesel == visit.Patient.Pesel && p.Date == command.Date);
            if (!(busyPatient is null))
                throw new AlreadyExistException("This patient already has a visit on this date");

            visit.Date = command.Date;
            visit.Room = command.Room;
            visit.Type = command.Type;

            await _dbContext.SaveChangesAsync();
        }

        public async Task EditVisit(EditVisit command)
        {
            var visit = _dbContext.Visits.Include(d => d.Doctor).Include(p => p.Patient).FirstOrDefault(v => v.Id == command.VisitId);
            if (visit is null)
                throw new NotFoundException("Visit doesn't exist");

            var existingVisit = _dbContext.Visits.FirstOrDefault(v => v.Date == command.EditDate && v.Room == command.Room);
            if (!(existingVisit is null))
                throw new AlreadyExistException("Visit has already been booked in the specified room on this date");

            var busyDoctor = _dbContext.Visits.FirstOrDefault(d => d.Doctor.Id == visit.Doctor.Id && d.Date == command.EditDate && d.Patient.Id != visit.Patient.Id);
            if (!(busyDoctor is null))
                throw new AlreadyExistException("This doctor already has a visit on this date");

            var busyPatient = _dbContext.Visits.FirstOrDefault(p => p.Patient.Id == visit.Patient.Id && p.Date == command.EditDate && p.Doctor.Id != visit.Doctor.Id);
            if (!(busyPatient is null))
                throw new AlreadyExistException("This patient already has a visit on this date");
            visit.Date = command.EditDate;
            visit.Room = command.Room;

            await _dbContext.SaveChangesAsync();
        }


        public async Task<Visit> GetVisitById(Guid visitId)
        {
            var visit = await _dbContext.Visits
                .Include(p => p.Patient)
                .Include(d => d.Doctor)
                .FirstOrDefaultAsync(v => v.Id == visitId);
            if (visit is null)
                throw new NotFoundException("Visit doesn't exist");
            return visit;

        }
        public async Task DeleteVisitByNurse(Guid visitId)
        {
            var visit = await _dbContext.Visits.FirstOrDefaultAsync(v => v.Id == visitId);
            if (visit is null)
                throw new NotFoundException("Visit doesn't exist");
            _dbContext.Visits.Remove(visit);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteVisit(DeleteVisit command)
        {
            var visit = await _dbContext.Visits.Include(d => d.Doctor).Include(p => p.Patient).FirstOrDefaultAsync(v => v.Id == command.VisitId);
            if (visit is null)
                throw new NotFoundException("Visit doesn't exist");

            if (!((visit.Patient.Id == command.UserId) || (visit.Doctor.Id == command.UserId)))
                throw new NotAllowedException("You're not assigned to this visit");

            _dbContext.Visits.Remove(visit);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteVisit(Guid visitId)
        {
            var visit = await _dbContext.Visits.FirstOrDefaultAsync(v => v.Id == visitId);
            if (visit is null)
                throw new NotFoundException("Visit doesn't exist");
            _dbContext.Visits.Remove(visit);
            await _dbContext.SaveChangesAsync();
        }

        public IEnumerable<VisitDto> GetAllVisits(Guid userId)
        {
            var visits = _dbContext
               .Visits
               .Where(u => u.Patient.Id == userId || u.Doctor.Id == userId)
               .Include(p => p.Patient)
               .Include(d => d.Doctor)
               .OrderBy(s => s.Date)
               .ToList();

            var visitsToDelete = visits.Where(v => v.Date < DateTime.Now).ToList();

            foreach (var visit in visitsToDelete)
            {
                visits.Remove(visit);
                DeleteVisit(visit.Id);
            }

            var visitsDto = visits.Select(v => new VisitDto
            {
                Id = v.Id,
                PatientFirstName = v.Patient.FirstName,
                PatientLastName = v.Patient.LastName,
                PatientEmail = v.Patient.Email,
                DoctorFirstName = v.Doctor.FirstName,
                DoctorLastName = v.Doctor.LastName, 
                DoctorEmail = v.Doctor.Email,
                Date = v.Date.ToString("yyyy'-'MM'-'dd' 'HH':'mm"),
                EditDate = v.Date,
                Room = v.Room,
                Type = v.Type,
                Duration = v.Duration
            }).ToList();

            return visitsDto;
        }

        public async Task<VisitDto> GetVisit(Guid visitId)
        {
            var visit = await GetVisitById(visitId);

            var visitDto = new VisitDto
            {
                Id = visit.Id,
                PatientFirstName = visit.Patient.FirstName,
                PatientLastName = visit.Patient.LastName,
                PatientEmail = visit.Patient.Email,
                DoctorFirstName = visit.Doctor.FirstName,
                DoctorLastName = visit.Doctor.LastName,
                DoctorEmail = visit.Doctor.Email,
                Date = visit.Date.ToString("yyyy'-'MM'-'dd' 'HH':'mm"),
                Room = visit.Room,
                Type = visit.Type,
                Duration = visit.Duration
            };

            return visitDto;
        }
    }
}
