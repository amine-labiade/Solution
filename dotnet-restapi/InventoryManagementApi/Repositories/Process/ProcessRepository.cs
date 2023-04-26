using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories
{
    public class ProcessRepository : IProcessRepository
    {
        private readonly InventoryDbContext _context;

        public ProcessRepository(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<ProcessDataModel> AddInventoryProcess(ProcessDataModel inventoryProcess)
        {
            _context.AttachRange(inventoryProcess.InventorySteps);
            _context.AttachRange(inventoryProcess.Users);
            await _context.InventoryProcesses.AddAsync(inventoryProcess);
            _context.SaveChanges();
            return inventoryProcess;
        }

        public async Task<IEnumerable<ProcessDataModel>> GetAllInventoryProcesses()
        {
            return await _context.InventoryProcesses.ToListAsync();
        }

        public async Task<ProcessDataModel> GetInventoryProcess(Guid id)
        {

            //var inventoryProcess = await _context.InventoryProcesses.FindAsync(id);
            //_context.SaveChanges();

            return await _context.InventoryProcesses.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }



        public async Task<ProcessDataModel> UpdateInventoryProcess(ProcessDataModel inventoryProcess)
        {
            var entity = _context.InventoryProcesses.Attach(inventoryProcess);
            entity.State = EntityState.Modified;
            _context.InventoryProcesses.Update(inventoryProcess);
            await _context.SaveChangesAsync();
            return inventoryProcess;
        }

        /// <summary>
        ///  Input: Id of process
        ///  Output: process
        ///  Description:this function allows to retrieve one process from database with tracking
        /// </summary>
        public async Task<ProcessDataModel> LazyLoadProcessById(Guid id)
        {
            return await _context.InventoryProcesses.FirstOrDefaultAsync(p => p.Id == id);
        }

        /// <summary>
        ///  Input: Id of process
        ///  Output: process
        ///  Description:this function allows to retrieve one process from database
        /// </summary>
        public async Task<ProcessDataModel> GetInventoryProcessLazyLoading(Guid id)
        {
            return await _context.InventoryProcesses.FirstOrDefaultAsync(p => p.Id == id);
        }

        /// <summary>
        ///  Input: -----
        ///  Output: archived processes
        ///  Description:this function allows to retrieve all archived processes from database
        /// </summary>
        public async Task<IEnumerable<ProcessDataModel>> GetAllArchivedProcesses()
        {
            return await _context.InventoryProcesses.Where(p => p.IsArchived).ToListAsync();
        }

        /// <summary>
        ///  Input: process
        ///  Output: boolean
        ///  Description:this function allows to delete process in database
        /// </summary>
        public async Task<bool> DeleteProcess(ProcessDataModel process)
        {
            _context.InventoryProcesses.Remove(process);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
