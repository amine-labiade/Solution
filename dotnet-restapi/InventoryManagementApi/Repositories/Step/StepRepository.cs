using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories
{
    public class StepRepository : IStepRepository
    {
        private readonly InventoryDbContext _context;

        public StepRepository(InventoryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Input: step
        ///  Output: new step 
        ///  Description:this function is used to add a new step in database
        /// </summary>
        public async Task<StepDataModel> AddStep(StepDataModel step)
        {
            await _context.Steps.AddAsync(step);
            _context.SaveChanges();
            return step;
        }

        /// <summary>
        ///  Input: step
        ///  Output: boolean,true if the step is deleted 
        ///  Description:this function is used to delete step in database
        /// </summary>
        public async Task<bool> DeleteStep(StepDataModel step)
        {
            _context.Steps.Remove(step);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        ///  Input: Id of step
        ///  Output: step
        ///  Description:this function allows to retrieve step from database
        /// </summary>
        public async Task<StepDataModel> GetStepById(Guid? id)
        {
            return await _context.Steps.FirstOrDefaultAsync(s => s.Id == id);
        }

        /// <summary>
        ///  Input: modified step
        ///  Output: Modified step
        ///  Description:this function allows to update step in database
        /// </summary>
        public async Task<StepDataModel> UpdateStep(StepDataModel step)
        {
            _context.Steps.Update(step);
            await _context.SaveChangesAsync();
            return step;
        }
    }
}
