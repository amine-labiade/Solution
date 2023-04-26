using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories
{
    public interface IDataSourceRepository
    {
        Task<IEnumerable<DataSourceDataModel>> GetAllDataSources();
        Task<DataSourceDataModel> GetDataSourceById(Guid? id);
        Task<DataSourceDataModel> AddDataSource(DataSourceDataModel dataSource);
        Task<DataSourceDataModel> UpdateDataSource(DataSourceDataModel dataSource);
        Task<Boolean> DeleteDataSource(DataSourceDataModel dataSource); 
    }
}
