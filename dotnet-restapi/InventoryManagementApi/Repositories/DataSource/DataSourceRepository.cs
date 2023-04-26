using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories
{
    public class DataSourceRepository:IDataSourceRepository
    {
        private readonly InventoryDbContext _context;

        public DataSourceRepository(InventoryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Input: data source
        ///  Output: new data source
        ///  Description:this function is used to add a new data source in database
        /// </summary>
        public async Task<DataSourceDataModel> AddDataSource(DataSourceDataModel dataSource)
        {
            await _context.DataSources.AddAsync(dataSource);
            _context.SaveChanges();
            return dataSource;
        }

        /// <summary>
        ///  Input: data source
        ///  Output: boolean,true if the data source is deleted 
        ///  Description:this function is used to delete data source in database
        /// </summary>
        public async Task<Boolean> DeleteDataSource(DataSourceDataModel dataSource)
        {
           _context.DataSources.Remove(dataSource);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        ///  Input: ----
        ///  Output: List of data sources
        ///  Description:this function allows to retrieve all data sources from database
        /// </summary>
        public async Task<IEnumerable<DataSourceDataModel>> GetAllDataSources()
        {
            return await _context.DataSources.ToListAsync();
        }

        /// <summary>
        ///  Input: Id of data source
        ///  Output: data source
        ///  Description:this function allows to retrieve data source from database
        /// </summary>
        public async Task<DataSourceDataModel> GetDataSourceById(Guid? id)
        {
            return await _context.DataSources.FirstOrDefaultAsync(s => s.Id == id);
        }

        /// <summary>
        ///  Input:  modified data source
        ///  Output: Modified data source
        ///  Description:this function allows to update data source un database
        /// </summary>
        public async Task<DataSourceDataModel> UpdateDataSource(DataSourceDataModel dataSource)
        {
            _context.DataSources.Update(dataSource);
            await _context.SaveChangesAsync();
            return dataSource;
            
        }
    }
}
