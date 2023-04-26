using InventoryManagementApi.DTOs.Field;
using InventoryManagementApi.Models;
using InventoryManagementApi.Services.Field;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldController : ControllerBase
    {
        private readonly IFieldService _fieldService;


        public FieldController(IFieldService fieldService)
        {
            _fieldService = fieldService;
        }

        //Get api/Field
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FieldResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<FieldResponse>>> GetAllFields()
        {
            return Ok(await _fieldService.GetAllFields());
        }


        //Get api/field/fieldDetails/{id}
        [HttpGet("fieldDetails/{id:Guid}")]
        [ProducesResponseType(typeof(Object), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Object>> GetFieldDetailsById(Guid id, [FromQuery] string category)
        {
            return Ok(await _fieldService.GetFieldDetailsById(id, category));
        }

        //Post api/Field
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> CreateDataSource([FromBody] FieldQuery field)
        {
            return Ok(await _fieldService.AddField(field));
        }


        //Delete api/Field/{id}
        [HttpDelete("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> DeleteField(Guid id)
        {
            var responseStatus = await _fieldService.DeleteField(id);
            if (responseStatus == false)
                return NotFound();
            return Ok("Field has been deleted successfuly !");
        }


    }
}
