using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Schedule;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Schedule
{
    public interface IScheduleService
    {
        Task<ScheduleDataModel> AddSchedule(ScheduleQuery schedule);
        Task<Stats> DeleteSchedule(Guid id);
        Task<ScheduleUpdate> UpdateSchedule(Guid id, ScheduleUpdate schedule);
    }
}
