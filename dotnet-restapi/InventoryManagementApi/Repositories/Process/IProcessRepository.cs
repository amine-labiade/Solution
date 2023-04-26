using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories
{
    public interface IProcessRepository
    {
        Task<ProcessDataModel> GetInventoryProcess(Guid id);
        Task<ProcessDataModel> LazyLoadProcessById(Guid id);
        Task<ProcessDataModel> GetInventoryProcessLazyLoading(Guid id);
        Task<IEnumerable<ProcessDataModel>> GetAllInventoryProcesses();
        Task<IEnumerable<ProcessDataModel>> GetAllArchivedProcesses();
        Task<ProcessDataModel> AddInventoryProcess(ProcessDataModel inventoryProcess);
        Task<ProcessDataModel> UpdateInventoryProcess(ProcessDataModel inventoryProcess);
        Task<Boolean> DeleteProcess(ProcessDataModel process);

    }
}
