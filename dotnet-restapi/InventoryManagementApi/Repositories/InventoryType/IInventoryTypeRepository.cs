using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.InventoryType
{
    public interface IInventoryTypeRepository
    {
        Task<IEnumerable<InventoryTypeDataModel>> GetAllInventoryTypes();

        Task<InventoryTypeDataModel> GetInventoryTypeById(int id);
    }
}
