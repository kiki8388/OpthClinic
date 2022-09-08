using Application.Commands;
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
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorServices _doctorServices;
        private readonly ApplicationDbContext _dbContext;
        public DoctorController(IDoctorServices doctorServices, ApplicationDbContext dbContext)
        {
            _doctorServices = doctorServices;
            _dbContext = dbContext;
        }

        [HttpPost("director/doctors/register_doctor")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> RegisterDoctor([FromBody] RegisterDoctor command)
        {
            await _doctorServices.CreateDoctorAsync(command);
            return Ok();
        }

        [HttpPost("login/doctor")]
        public ActionResult LoginDoctor([FromBody] LoginUser command)
        {
            string token = _doctorServices.GenerateJwt(command);
            return Ok(token);
        }

        [HttpPut("doctor/doctors/{doctorId}/change_password")]
        [Authorize(Roles = "Doctor,Director")]
        public async Task<IActionResult> ChangeDoctorPassword(Guid doctorId, [FromBody] ChangeUserPassword command)
        {
            command.userId = doctorId;
            await _doctorServices.ChangeDoctorPassword(command);
            return Ok();
        }

        [HttpPut("director/doctors/{doctorId}/recover_password")]
        //[Authorize(Roles = "Director")]
        public async Task<IActionResult> RecoverDoctorPassword(Guid doctorId, [FromBody] ChangeUserPassword command)
        {
            command.userId = doctorId;
            await _doctorServices.ChangeDoctorPassword(command);
            return Ok();
        }

        [HttpGet("director/all_doctors")]
        [Authorize(Roles = "Director")]
        public ActionResult<IEnumerable<DoctorDto>> GetAllDoctors()
        {
            var doctors = _doctorServices.GetAllDoctors();

            return Ok(doctors);
        }

        [HttpGet("patient/all_doctors")]
        [Authorize(Roles = "Patient")]
        public ActionResult<IEnumerable<DoctorDto>> GetAllDoctorsForPatient()
        {
            var doctors = _doctorServices.GetAllDoctorsForPatient();

            return Ok(doctors);
        }

        [HttpGet("basic_data/all_doctors")]
        [Authorize(Roles = "Nurse,Doctor")]
        public ActionResult<IEnumerable<DoctorDto>> GetAllDoctorsBasicData()
        {
            var doctors = _doctorServices.GetAllDoctorsBasicData();

            return Ok(doctors);
        }

        [HttpGet("profile/{doctorId}")]
        [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<DoctorDto>> GetDoctorPublic(Guid doctorId)
        {
            var doctor = await _doctorServices.GetDoctorPublic(doctorId);

            return Ok(doctor);
        }

        [HttpPut("doctors/{doctorId}/edit_data")]
        [Authorize(Roles = "Doctor,Director")]
        public async Task<IActionResult> EditDoctorData(Guid doctorId, [FromBody] EditWorkerData command)
        {
            command.WorkerId = doctorId;
            await _doctorServices.EditDoctorData(command);
            return Ok();
        }

        [HttpPut("doctor/{doctorId}/edit_about_info")]
        [Authorize(Roles = "Doctor")]
        public async Task<IActionResult> EditDoctorAboutInfo(Guid doctorId, [FromBody] EditDoctorAboutInfo command)
        {
            command.DoctorId = doctorId;
            await _doctorServices.EditDoctorAboutInfo(command);
            return Ok();
        }

        [HttpDelete("doctor/{doctorId}/delete")]
        //[Authorize(Roles = "Doctor")]
        public async Task<IActionResult> DeleteDoctor()
        {
            var doctorId = User.GetUserId();

            await _doctorServices.DeleteDoctor(doctorId);
            return Ok();
        }

        [HttpDelete("director/doctors/{doctorId}/delete")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> DeleteDoctorByWorker(Guid doctorId)
        {
            await _doctorServices.DeleteDoctor(doctorId);
            return Ok();
        }

        [HttpGet("visit/all_doctors")]
        [Authorize(Roles = "Patient,Nurse,Doctor,Director")]
        public ActionResult<IEnumerable<DoctorVisitDto>> GetAllDoctorsVisit()
        {
            var doctors = _doctorServices.GetAllDoctorsVisit();

            return Ok(doctors);
        }

        [HttpGet("doctor/profile")]
        [Authorize(Roles = "Doctor")]
        public ActionResult<DoctorDto> GetDoctorProfile()
        {
            var doctorId = User.GetUserId();
            var doctor = _doctorServices.GetDoctorProfile(doctorId);

            return Ok(doctor);
        }
    }
}
