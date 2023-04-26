using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.Services.InventoryType;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryTypeController : Controller
    {
        private readonly IIventoryTypeService _inventoryTypeService;

        public InventoryTypeController(IIventoryTypeService inventoryTypeService)
        {
            _inventoryTypeService = inventoryTypeService;
        }

        /// <summary>
        /// Get all inventory types
        /// </summary>
        //Get :api/InventoryType
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<GenericListItem<int>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<GenericListItem<int>>>> GetAllInventoryTypes()
        {
            return Ok(await _inventoryTypeService.GetAllInventoryTypes());
        }

    }
}
