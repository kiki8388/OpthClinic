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
    public class NurseController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly INurseServices _nurseServices;

        public NurseController(INurseServices nurseServices, ApplicationDbContext dbContext)
        {
            _nurseServices = nurseServices;
            _dbContext = dbContext;
        }

        [HttpPost("director/nurses/register_nurse")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> RegisterNurse([FromBody] RegisterNurse command)
        {
            await _nurseServices.CreateNurseAsync(command);
            return Ok();
        }

        [HttpPost("login/nurse")]
        public ActionResult LoginNurse([FromBody] LoginUser command)
        {
            string token = _nurseServices.GenerateJwt(command);
            return Ok(token);
        }

        [HttpPut("nurse/{nurseId}/change_password")]
        [Authorize(Roles = "Nurse,Director")]
        public async Task<IActionResult> ChangeNursePassword(Guid nurseId, [FromBody] ChangeUserPassword command)
        {
            //command.userId = User.GetUserId();
            command.userId = nurseId;
            await _nurseServices.ChangeNursePassword(command);
            return Ok();
        }

        [HttpPut("director/nurses/{nurseId}/recover_password")]
        //[Authorize(Roles = "Director")]
        public async Task<IActionResult> RecoverNursePassword(Guid nurseId, [FromBody] ChangeUserPassword command)
        {
            command.userId = nurseId;
            await _nurseServices.ChangeNursePassword(command);
            return Ok();
        }

        [HttpPut("nurse/{nurseId}/edit_data")]
        [Authorize(Roles = "Nurse,Director")]
        public async Task<IActionResult> EditNurseData(Guid nurseId, [FromBody] EditWorkerData command)
        {
            command.WorkerId = nurseId;
            await _nurseServices.EditNurseData(command);
            return Ok();
        }

        //[HttpDelete("nurse/{nurseId}/delete")]
        //[Authorize(Roles = "Director")]
        //public async Task<IActionResult> DeleteNurse(Guid nurseId)
        //{
        //    await _nurseServices.DeleteNurse(nurseId);
        //    return Ok();
        //}

        [HttpDelete("director/nurses/{nurseId}/delete")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> DeleteNurseByDirector(Guid nurseId)
        {
            await _nurseServices.DeleteNurse(nurseId);
            return Ok();
        }

        [HttpGet("all_nurses")]
        [Authorize(Roles = "Director")]
        public ActionResult<IEnumerable<NurseDto>> GetAllNurses()
        {
            var nurses = _nurseServices.GetAllNurses();

            return Ok(nurses);
        }

        [HttpGet("basic_data/all_nurses")]
        [Authorize(Roles = "Patient,Nurse,Doctor")]
        public ActionResult<IEnumerable<NurseDto>> GetAllNursesBasicData()
        {
            var nurses = _nurseServices.GetAllNursesBasicData();

            return Ok(nurses);
        }

        [HttpGet("nurse/profile")]
        [Authorize(Roles = "Nurse")]
        public ActionResult<NurseDto> GetNurseProfile()
        {
            var nurseId = User.GetUserId();
            var nurse = _nurseServices.GetNurseProfile(nurseId);

            return Ok(nurse);
        }
    }
}
