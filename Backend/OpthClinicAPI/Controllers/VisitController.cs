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
    public class VisitController : ControllerBase
    {
        public readonly ApplicationDbContext _dbContext;
        public readonly IVisitServices _visitServices;

        public VisitController(ApplicationDbContext dbContext, IVisitServices visitServices)
        {
            _dbContext = dbContext;
            _visitServices = visitServices;
        }

        [HttpPost("visit/create")]
        [Authorize(Roles = "Patient,Nurse,Doctor,Director")]
        public async Task<IActionResult> CreateVisit(CreateVisit command)
        {
            await _visitServices.CreateVisit(command);
            return Ok();
        }

        //ROZDZIELIC NA PATIENT I WORKER
        [HttpPut("visit/{visitId}/edit")]
        [Authorize(Roles = "Patient,Nurse,Doctor,Director")]
        public async Task<IActionResult> EditVisit(Guid visitId, EditVisit command)
        {
            command.VisitId = visitId;

            await _visitServices.EditVisit(command);
            return Ok();
        }

        [HttpDelete("visits/{visitId}/delete")]
        [Authorize(Roles = "Patient,Doctor,Nurse,Director")]
        public async Task<IActionResult> DeleteVisit(Guid visitId)
        {
            await _visitServices.DeleteVisit(visitId);
            return Ok();
        }

        [HttpGet("{userId}/all_visits")]
        [Authorize(Roles = "Patient,Doctor,Nurse,Director")]
        public ActionResult<IEnumerable<VisitDto>> GetAllVisitsForUser(Guid userId)
        {
            var visits = _visitServices.GetAllVisits(userId);

            return Ok(visits);
        }

        [HttpGet("visit/{visitId}")]
        [Authorize(Roles = "Patient,Doctor,Nurse,Director")]
        public ActionResult<VisitDto> GetVisit(Guid visitId)
        {
            var visit = _visitServices.GetVisit(visitId);

            return Ok(visit);
        }
    }
}
