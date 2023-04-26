using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.InventoryType
{
    public interface IIventoryTypeService
    {
        Task<IEnumerable<GenericListItem<int>>> GetAllInventoryTypes();
        Task<InventoryTypeDataModel> GetInventoryById(int id);
    }
}
