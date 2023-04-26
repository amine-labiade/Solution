using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.Shedule
{
    public interface IScheduleRepository
    {
        Task<ScheduleDataModel> AddSchedule(ScheduleDataModel schedule);
        Task<Boolean> DeleteSchedule(ScheduleDataModel schedule);
        Task<ScheduleDataModel> GetScheduleById(Guid id);
        Task<ScheduleDataModel> UpdateSchedule(ScheduleDataModel schedule);
    }
}
