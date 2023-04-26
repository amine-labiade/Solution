using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.InventoryType
{
    public class InventoryTypeRepository: IInventoryTypeRepository
    {
        private readonly InventoryDbContext _context;

        public InventoryTypeRepository(InventoryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Input: ----
        ///  Output: List of inventory types
        ///  Description:this function allows to retrieve all inventory types from database
        /// </summary>
        public async Task<IEnumerable<InventoryTypeDataModel>> GetAllInventoryTypes()
        {
            return await _context.InventoryTypes.ToListAsync();
        }

        /// <summary>
        ///  Input: Id of inventory type
        ///  Output: inventory type
        ///  Description:this function allows to retrieve one inventory type from database
        /// </summary>
        public async Task<InventoryTypeDataModel> GetInventoryTypeById(int id)
        {
            return await _context.InventoryTypes.SingleOrDefaultAsync(t => t.Id == id);
        }


    }
}
