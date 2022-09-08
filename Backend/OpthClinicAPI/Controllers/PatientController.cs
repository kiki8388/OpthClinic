using Application.Commands;
using Application.Commands.Doctor;
using Application.Commands.Patient;
using Application.Dto;
using Application.Services;
using Domain.Common.Extensions;
using Infrastructure.DbContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OpthClinicAPI.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientServices _patientServices;
        private readonly ApplicationDbContext _dbContext;

        public PatientController(IPatientServices patientServices, ApplicationDbContext dbContext)
        {
            _patientServices = patientServices;
            _dbContext = dbContext;
        }

        [HttpPost("patients/register_patient")]
        [Authorize(Roles = "Nurse,Doctor,Director")]
        public async Task<IActionResult> RegisterPatient([FromBody] RegisterPatient command)
        {
            await _patientServices.CreatePatientAsync(command);
            return Ok();
        }

        [HttpPost("login/patient")]
        public ActionResult LoginPatient([FromBody] LoginUser command)
        {
            string token = _patientServices.GenerateJwt(command);
            return Ok(token);
        }

        [HttpPut("patients/{patientId}/change_password")]
        [Authorize(Roles = "Patient,Director")]
        public async Task<IActionResult> ChangePatientPassword(Guid patientId, [FromBody] ChangeUserPassword command)
        {
            //command.userId = User.GetUserId();
            command.userId = patientId;
            await _patientServices.ChangePatientPassword(command);
            return Ok();
        }

        [HttpPut("patients/{patientId}/recover_password")]
        //[Authorize(Roles = "Nurse,Doctor,Director")]
        public async Task<IActionResult> RecoverPatientPassword(Guid patientId, [FromBody] ChangeUserPassword command)
        {
            command.userId = patientId;
            await _patientServices.ChangePatientPassword(command);
            return Ok();
        }

        [HttpGet("patient/{patientId}")]
        //[Authorize]
        public async Task<IActionResult> GetPatientById(Guid patientId)
        {
            return Ok(await _patientServices.GetPatientById(patientId));
        }

        //UZUPELNIC NA FRONCIE, WYSWIETLIC LISTE PACJENTOW PO KLIKNIECIU
        [HttpPost("doctor/{doctorId}/patients/{patientId}/assign_patient")]
        //[Authorize(Roles = "Doctor")]
        public async Task<ActionResult> AssignPatient(Guid patientId, Guid doctorId, [FromBody] AssignPatient command)
        {
            command.DoctorId = doctorId;
            command.PatientId = patientId;
            await _patientServices.AssignPatient(command);
            return Ok();
        }

        [HttpPost("doctor/{doctorId}/patients/{patientId}/unassign_patient")]
        //[Authorize(Roles = "Doctor")]
        public async Task<ActionResult> UnssignPatient(Guid patientId, Guid doctorId, [FromBody] AssignPatient command)
        {
            command.DoctorId = doctorId;
            command.PatientId = patientId;
            await _patientServices.UnassignPatient(command);
            return Ok();
        }

        [HttpGet("doctors/{doctorId}/assigned_patients")]
        [Authorize(Roles = "Nurse,Doctor,Director")]
        public ActionResult<IEnumerable<PatientDto>> GetAssignedPatients(Guid doctorId)
        {
            return Ok(_patientServices.GetAssignedPatients(doctorId));
        }

        [HttpPut("nurse/patients/{patientId}/edit_medical_history")]
        [Authorize(Roles = "Nurse")]
        public async Task<IActionResult> EditMedicalHistoryNurse(Guid patientId, [FromBody] EditMedicalHistory command)
        {
            command.PatientId = patientId;
            await _patientServices.EditMedicalHistoryNurse(command);
            return Ok();
        }

        [HttpPut("doctor/patients/{patientId}/edit_medical_history")]
        [Authorize(Roles = "Doctor")]
        public async Task<IActionResult> EditMedicalHistoryDoctor(Guid patientId, [FromBody] EditMedicalHistory command)
        {
            command.PatientId = patientId;
            await _patientServices.EditMedicalHistoryDoctor(command);
            return Ok();
        }

        [HttpGet("patient/patients/{patientId}/my_medical_history")]
        //[Authorize(Roles = "Patient")]
        public async Task<IActionResult> GetMedicalHistoryPatient(Guid patientId)
        {
            var command = new GetMedicalHistoryPatient();
            var currentUserId = User.GetUserId();
            command.PatientId = patientId;
            command.CurrentUserId = currentUserId;
            return Ok(await _patientServices.GetMedicalHistoryPatient(command));
        }

        [HttpGet("patients/{patientId}/medical_history")]
        //[Authorize(Roles = "Nurse,Doctor,Director")]
        public async Task<IActionResult> GetMedicalHistory(Guid patientId)
        {
            return Ok(await _patientServices.GetMedicalHistory(patientId));
        }

        [HttpPut("patients/{patientId}/edit_data")]
        [Authorize(Roles = "Patient,Nurse,Doctor,Director")]
        public async Task<IActionResult> EditPatientData(Guid patientId, [FromBody] EditPatientData command)
        {
            command.PatientId = patientId;
            await _patientServices.EditPatientData(command);
            return Ok();
        }



        [HttpGet("patients/{patientId}/assigned_doctor")]
        [Authorize(Roles = "Patient,Nurse,Doctor,Director")]
        public async Task<ActionResult<DoctorDto>> GetAssignedDoctor(Guid patientId)
        {
            var doctor = await _patientServices.GetAssignedDoctor(patientId);

            return Ok(doctor);
        }

        [HttpDelete("patient/{patientId}/delete")]
        //[Authorize(Roles = "Patient")]
        public async Task<IActionResult> DeletePatient()
        {
            var patientId = User.GetUserId();

            await _patientServices.DeletePatient(patientId);
            return Ok();
        }

        [HttpDelete("patients/{patientId}/delete")]
        [Authorize(Roles = "Nurse,Doctor,Director")]
        public async Task<IActionResult> DeletePatientByWorker(Guid patientId)
        {
            await _patientServices.DeletePatient(patientId);
            return Ok();
        }

        [HttpGet("patient/get_all")]
        [Authorize(Roles = "Nurse,Doctor,Director")]
        public ActionResult<IEnumerable<PatientDto>> GetAllPatients()
        {
            var patients = _patientServices.GetAllPatients();

            return Ok(patients);
        }

        [HttpGet("visit/all_patients")]
        [Authorize(Roles = "Nurse,Doctor,Director")]
        public ActionResult<IEnumerable<PatientVisitDto>> GetAllPatientsVisit()
        {
            var patients = _patientServices.GetAllPatientsVisit();

            return Ok(patients);
        }

        [HttpGet("patient/profile")]
        [Authorize(Roles = "Patient")]
        public ActionResult<PatientDto> GetPatientProfile()
        {
            var patientId = User.GetUserId();
            var patients = _patientServices.GetPatientProfile(patientId);

            return Ok(patients);
        }
    }
}
