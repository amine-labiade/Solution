using AutoMapper;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Schedule;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories.Shedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Schedule
{
    public class ScheduleService:IScheduleService
    {
        private readonly IMapper _mapper;
        private readonly IScheduleRepository _scheduleRepository;

        public ScheduleService(IMapper mapper, IScheduleRepository scheduleRepository)
        {
            _mapper = mapper;
            _scheduleRepository = scheduleRepository;
        }

        /// <summary>
        ///  Input: new schedule
        ///  Output: schedule u
        ///  Description:this function allows to add  new schedule
        /// </summary>
        public async Task<ScheduleDataModel> AddSchedule(ScheduleQuery schedule)
        {
            var ScheduleData = _mapper.Map<ScheduleDataModel>(schedule);
            await _scheduleRepository.AddSchedule(ScheduleData);

            return ScheduleData;
        }

        /// <summary>
        ///  Input: Id of schedule 
        ///  Output: true or false
        ///  Description:this function allows to delete schedule
        /// </summary>
        public async Task<Stats> DeleteSchedule(Guid id)
        {
            var schedule = await _scheduleRepository.GetScheduleById(id);
            if (schedule == null)
                return Stats.NotExist;
            await _scheduleRepository.DeleteSchedule(schedule);
            return Stats.Success;
        }

        /// <summary>
        ///  Input: Id of schedule and schedule to update
        ///  Output: schedule updated
        ///  Description:this function allows to update schedule
        /// </summary>
        public async Task<ScheduleUpdate> UpdateSchedule(Guid id, ScheduleUpdate schedule)
        {
            var scheduleToUpdate = await _scheduleRepository.GetScheduleById(id);
            if (scheduleToUpdate == null)
                return null;
            scheduleToUpdate.StartDate = schedule.StartDate;
            scheduleToUpdate.EndDate = schedule.EndDate;
            await _scheduleRepository.UpdateSchedule(_mapper.Map<ScheduleDataModel>(scheduleToUpdate));
            return schedule;
        }
    }
}
