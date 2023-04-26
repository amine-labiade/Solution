using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.DataSource;
using InventoryManagementApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Controllers
{
    /// <summary>
    /// Data source Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class DataSourceController : ControllerBase
    {
        private readonly IDataSourceService _dataSourceService;

        public DataSourceController(IDataSourceService dataSourceService)
        {
            _dataSourceService = dataSourceService;
        }

        /// <summary>
        /// Create a new data source
        /// </summary>
        //Post :api/DataSource
        [HttpPost]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> CreateDataSource([FromBody] DataSourceQuery dataSource)
        {
            return Ok(await _dataSourceService.AddDataSource(dataSource));
        }

        /// <summary>
        /// Get all data sources
        /// </summary>
        //Get :api/DataSource
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<DataSourceResponse>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<DataSourceResponse>>> GetAllDataSources()
        {
            return Ok(await _dataSourceService.GetAllDataSources());
        }

        /// <summary>
        /// Fetches an data source by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //Get :api/DataSource/{id}
        [HttpGet("{id:Guid}")]
        [ProducesResponseType(typeof(DataSourceQuery), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<DataSourceQuery>> GetDataSourceById(Guid id)
        {
            var dataSource = await _dataSourceService.GetDataSourceById(id);
            if (dataSource == null)
                return NotFound();
            else
                return Ok(dataSource);
        }

        /// <summary>
        /// Delete data source by id 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //Delete :api/DataSource/{id}
        [HttpDelete("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Stats>> DeleteDataSourceById(Guid id)
        {
            return Ok(await _dataSourceService.DeleteDataSource(id));
        }

        /// <summary>
        /// Update data source by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //Put :api/DataSource/{id}
        [HttpPut("{id:Guid}")]
        [ProducesResponseType(typeof(DataSourceUpdate), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<DataSourceUpdate>> UpdateDataSource(Guid id, [FromBody] DataSourceUpdate dataSource)
        {
            if (id != dataSource.Id)
                return BadRequest();
            var response = await _dataSourceService.UpdateDataSource(id, dataSource);
            if (response == null)
                return BadRequest();
            return Ok(response);
        }


        /// <summary>
        /// Get all data sources
        /// </summary>
        //Get :api/DataSource/GetAllDataSourcesItems
        [Route("[action]")]
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<GenericListItem<Guid>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<GenericListItem<Guid>>>> GetAllDataSourcesItems()
        {
            return Ok(await _dataSourceService.GetAllDataSourcesItems());
        }

        //Get :api/DataSource/usersFromApi/{id}
        [HttpGet("usersFromApi/{id:Guid}")]
        [ProducesResponseType(typeof(IEnumerable<UsersApi>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<UsersApi>>> GetUsersFromApi(Guid id)
        {
            return Ok(await _dataSourceService.GetUsersFromApi(id));
        }

        //Get :api/DataSource/dataFromApi/{id}
        [HttpGet("dataFromApi/{id:Guid}")]
        [ProducesResponseType(typeof(IEnumerable<GenericListItem<string>>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<GenericListItem<string>>>> GetDataFromApi(Guid id)
        {
            return Ok(await _dataSourceService.GetOptionsFromApi(id));
        }










    }
}
