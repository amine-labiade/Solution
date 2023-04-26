using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Process;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services
{
    public interface IProcessService
    {
        Task<Guid> AddInventoryProcess(ProcessQuery process);
        Task<ProcessDetail> GetInventoryProcessDetail(Guid id);
        Task<ProcessResponseForUpdate> GetProcessById(Guid id);
        Task<IEnumerable<ProcessResponse>> GetAllProcesses();
        Task<IEnumerable<ProcessArchivedResponse>> GetAllArchivedProcesses();
        Task<ProcessUpdate> UpdateInventoryProcess(Guid id, ProcessUpdate process);
        Task<Guid?> CreateProcessFromExisting(Guid id);
        Task<bool> ToggleProcessArchiving(Guid id);
        Task<bool> ToggleProcessFavorite(Guid id);
        Task<Stats> DeleteProcess(Guid id);
    }
}
