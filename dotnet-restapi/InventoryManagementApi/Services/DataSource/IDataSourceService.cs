using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.DataSource;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services
{
    public interface IDataSourceService
    {
        Task<Guid> AddDataSource(DataSourceQuery dataSource);
        Task<IEnumerable<DataSourceResponse>> GetAllDataSources();
        Task<IEnumerable<GenericListItem<Guid>>> GetAllDataSourcesItems();
        Task<DataSourceQuery> GetDataSourceById(Guid? id);
        Task<Stats> DeleteDataSource(Guid id);
        Task<DataSourceUpdate> UpdateDataSource(Guid id, DataSourceUpdate dataSource);
        Task<IEnumerable<UsersApi>> GetUsersFromApi(Guid id);
        Task<IEnumerable<GenericListItem<string>>> GetOptionsFromApi(Guid id);
    }
}
