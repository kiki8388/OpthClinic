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
    public class DirectorController : ControllerBase
    {
        private readonly IDirectorServices _directorServices;
        private readonly ApplicationDbContext _dbContext;

        public DirectorController(IDirectorServices directorServices, ApplicationDbContext dbContext)
        {
            _directorServices = directorServices;
            _dbContext = dbContext;
        }

        [HttpPost("director/directors/register_director")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> RegisterDirector([FromBody] RegisterDirector command)
        {
            await _directorServices.CreateDirectorAsync(command);
            return Ok();
        }

        [HttpPost("login/director")]
        public ActionResult LoginDirector([FromBody] LoginUser command)
        {
            string token = _directorServices.GenerateJwt(command);
            return Ok(token);
        }

        [HttpPut("director/directors/{directorId}/change_password")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> ChangeDirectorPassword(Guid directorId, [FromBody] ChangeUserPassword command)
        {
            //command.userId = User.GetUserId();
            command.userId = directorId;
            await _directorServices.ChangeDirectorPassword(command);
            return Ok();
        }

        [HttpPut("director/{directorId}/edit_data")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> EditDirectorData(Guid directorId, [FromBody] EditWorkerData command)
        {
            command.WorkerId = directorId;
            await _directorServices.EditDirectorData(command);
            return Ok();
        }

        [HttpDelete("director/directors/{directorId}/delete")]
        [Authorize(Roles = "Director")]
        public async Task<IActionResult> DeleteDirector(Guid directorId)
        {
            await _directorServices.DeleteDirector(directorId);
            return Ok();
        }

        [HttpGet("all_directors")]
        [Authorize(Roles = "Director")]
        public ActionResult<IEnumerable<DirectorDto>> GetAllDirectors()
        {
            var directors = _directorServices.GetAllDirectors();

            return Ok(directors);
        }

        [HttpGet("basic_data/all_directors")]
        [Authorize(Roles = "Patient,Nurse,Doctor,Director")]
        public ActionResult<IEnumerable<DirectorDto>> GetAllDirectorsBasicData()
        {
            var directors = _directorServices.GetAllDirectorsBasicData();

            return Ok(directors);
        }

        [HttpGet("director/profile")]
        [Authorize(Roles = "Director")]
        public ActionResult<DirectorDto> GetDirectorProfile()
        {
            var directorId = User.GetUserId();
            var director = _directorServices.GetDirectorProfile(directorId);

            return Ok(director);
        }
    }
}
