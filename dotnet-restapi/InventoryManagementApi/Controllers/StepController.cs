using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Step;
using InventoryManagementApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Controllers
{
    /// <summary>
    /// Step Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class StepController : ControllerBase
    {
        private readonly IStepService _stepService;

        public StepController(IStepService stepService)
        {
            _stepService = stepService;
        }


        //Post :api/Step
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> CreateStep([FromBody] StepQuery step)
        {
            // should later add logic to handle polymorphism of step fields
            return Ok(await _stepService.AddStep(step));

        }


        //Get :api/Step/getStepsWithoutNext/{idProcess}?idStep
        [HttpGet("getStepsWithoutNext/{idProcess:Guid}/{idStep:Guid}")]
        [ProducesResponseType(typeof(IEnumerable<StepWithoutNextResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<StepWithoutNextResponse>>> GetAllStepsForProcess([FromQuery] Guid idPreviousStep, Guid idProcess, Guid idStep)
        {
            return Ok(await _stepService.GetAllStepsForProcess(idProcess, idPreviousStep, idStep));
        }


        //Get :api/Step/{id}
        [HttpGet("{id:Guid}")]
        [ProducesResponseType(typeof(StepResponseDetails), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<StepResponseDetails>> GetStepById(Guid id)
        {
            var step = await _stepService.GetStepById(id);
            if (step == null)
                return NotFound();
            else
                return Ok(step);
        }

        //Delete :api/Step/getStepForUpdate/{id}
        [HttpGet("getStepForUpdate/{id:Guid}")]
        [ProducesResponseType(typeof(StepResponseForUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<StepResponseForUpdate>> GetStepForUpdate(Guid id)
        {
            var step = await _stepService.GetStepForUpdate(id);
            if (step == null)
                return NotFound();
            return Ok(step);
        }



        //Delete :api/Step/{id}
        [HttpDelete("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Stats>> DeleteStepById(Guid id)
        {
            return Ok(await _stepService.DeleteStep(id));
        }


        //Put :api/step/{id}
        [HttpPut("{id:Guid}")]
        [ProducesResponseType(typeof(StepUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<StepUpdate>> UpdateStep(Guid id, [FromBody] StepUpdate step)
        {
            if (id != step.Id)
                return BadRequest();
            var response = await _stepService.UpdateStep(id, step);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }
    }
}
