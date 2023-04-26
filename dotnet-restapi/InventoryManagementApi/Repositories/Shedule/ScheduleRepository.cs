using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.Shedule
{
    public class ScheduleRepository:IScheduleRepository
    {
        private readonly InventoryDbContext _context;

        public ScheduleRepository(InventoryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Input:  new schedule
        ///  Output: schedule
        ///  Description:this function allows to add new schedule in database
        /// </summary>
        public async Task<ScheduleDataModel> AddSchedule(ScheduleDataModel schedule)
        {
            await _context.Schedules.AddAsync(schedule);
            _context.SaveChanges();
            return schedule;
        }

        /// <summary>
        ///  Input: Schedule
        ///  Output: true
        ///  Description:this function allows to delete schedule in database
        /// </summary>
        public async Task<bool> DeleteSchedule(ScheduleDataModel schedule)
        {
            _context.Schedules.Remove(schedule);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        ///  Input: Id of schedule
        ///  Output: schedule
        ///  Description:this function allows to retrieve one schedule  from database
        /// </summary>
        public async Task<ScheduleDataModel> GetScheduleById(Guid id)
        {
            return await _context.Schedules.FirstOrDefaultAsync(s => s.Id == id);
        }

        /// <summary>
        ///  Input: schedule to modify
        ///  Output: schedule updated
        ///  Description:this function allows to update schedule in database
        /// </summary>
        public async Task<ScheduleDataModel> UpdateSchedule(ScheduleDataModel schedule)
        {
            _context.Schedules.Update(schedule);
            await _context.SaveChangesAsync();
            return schedule;
        }
    }
}
