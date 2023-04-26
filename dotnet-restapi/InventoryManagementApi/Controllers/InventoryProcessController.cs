using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Process;
using InventoryManagementApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InventoryManagementApi.Controllers
{

    /// <summary>
    /// Inventory Process Management Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryProcessController : ControllerBase
    {
        private readonly IProcessService _processService;

        public InventoryProcessController(IProcessService processService)
        {
            _processService = processService;
        }



        // POST api/InventoryProcesses
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> AddInventoryProcess([FromBody] ProcessQuery inventoryProcess)
        {
            return Ok(await _processService.AddInventoryProcess(inventoryProcess));
        }


        // GET api/InventoryProcesses/{id}
        [HttpGet("{id:Guid}")]
        [ProducesResponseType(typeof(ProcessDetail), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProcessDetail>> GetInventoryProcess(Guid id)
        {
            return Ok(await _processService.GetInventoryProcessDetail(id));
        }

        // GET api/InventoryProcesses
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProcessResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<ProcessResponse>>> GetAllProcesses()
        {
            return Ok(await _processService.GetAllProcesses());
        }

        // PUT api/InventoryProcesses/{id}
        [HttpPut("{id:Guid}")]
        [ProducesResponseType(typeof(ProcessUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProcessUpdate>> UpdateInventoryProcess(Guid id, [FromBody] ProcessUpdate inventoryProcess)
        {
            if (id != inventoryProcess.Id)
            {
                return BadRequest();
            }
            var response = await _processService.UpdateInventoryProcess(id, inventoryProcess);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }



        [HttpPost("copy")]
        [ProducesResponseType(typeof(ProcessUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> CreateProcessFromExisting([FromBody] Guid id)
        {
            return await _processService.CreateProcessFromExisting(id);
        }


        // GET api/InventoryProcesses/archive/{id}
        [HttpGet("archive/{id:Guid}")]
        [ProducesResponseType(typeof(ProcessUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProcessUpdate>> ArchiveProcess(Guid id)
        {
            var response = await _processService.ToggleProcessArchiving(id);
            if (response == false)
                return BadRequest();
            return Ok(response);
        }


        // GET api/InventoryProcesses/favorite/{id}
        [HttpGet("favorite/{id:Guid}")]
        [ProducesResponseType(typeof(ProcessUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProcessUpdate>> FavoriteProcess(Guid id)
        {
            var response = await _processService.ToggleProcessFavorite(id);
            if (response == false)
                return BadRequest();
            return Ok(response);
        }

        // GET api/InventoryProcesses/processToUpdate/{id}
        [HttpGet("processToUpdate/{id:Guid}")]
        [ProducesResponseType(typeof(ProcessResponseForUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProcessResponseForUpdate>> GetProcessForUpdate(Guid id)
        {
            var response = await _processService.GetProcessById(id);
            if (response == null)
                return NotFound();
            else
                return Ok(response);
        }



        // GET api/InventoryProcesses/archivedProcesses
        [HttpGet("archivedProcesses")]
        [ProducesResponseType(typeof(ProcessArchivedResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<ProcessArchivedResponse>> GetArchivedProcesses()
        {
            return Ok(await _processService.GetAllArchivedProcesses());
        }

        //Delete :api/InventoryProcesses/{id}
        [HttpDelete("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Stats>> DeleteProcessById(Guid id)
        {
            return Ok(await _processService.DeleteProcess(id));
        }
    }
}
