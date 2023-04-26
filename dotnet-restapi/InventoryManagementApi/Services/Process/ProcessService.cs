using AutoMapper;
using InventoryManagementApi.DTOs.Process;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories;
using InventoryManagementApi.Repositories.InventoryType;
using InventoryManagementApi.Services.Schedule;
using InventoryManagementApi.Services.User;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using InventoryManagementApi.DTOs.Schedule;
using System.Collections.ObjectModel;
using InventoryManagementApi.DTOs.User;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.Services.Common;

namespace InventoryManagementApi.Services
{

    public class ProcessService : IProcessService
    {
        private readonly IMapper _mapper;
        private readonly IProcessRepository _processRepository;
        private readonly IInventoryTypeRepository _inventoryTypeRepository;
        private readonly IScheduleService _scheduleService;
        private readonly IUserService _userService;
        private readonly IDataSourceRepository _dataSourceRepository;
        private readonly IStepRepository _stepRepository;
        private readonly ICommonServices _commonService;

        public ProcessService(IMapper mapper, IProcessRepository processRepository,
            IInventoryTypeRepository inventoryTypeRepository, IScheduleService scheduleService,
            IUserService userService, IDataSourceRepository dataSourceRepository,
            IStepRepository stepRepository, ICommonServices commonService)
        {
            _mapper = mapper;
            _processRepository = processRepository;
            _inventoryTypeRepository = inventoryTypeRepository;
            _scheduleService = scheduleService;
            _userService = userService;
            _dataSourceRepository = dataSourceRepository;
            _stepRepository = stepRepository;
            _commonService = commonService;
        }
        /// <summary>
        /// add new inventory process
        /// </summary>
        /// <param name="process"></param>
        /// <returns></returns>
        public async Task<Guid> AddInventoryProcess(ProcessQuery process)
        {
            var processMap = _mapper.Map<ProcessDataModel>(process);
            processMap.InventoryType = await _inventoryTypeRepository.GetInventoryTypeById(process.Type);
            processMap.State = _commonService.SetState(process.PublishingDate, process.UnpublishingDate);
            if (process.PublishingDate.HasValue || process.UnpublishingDate.HasValue)
            {
                var schedule = new ScheduleQuery(process.PublishingDate.Value, process.UnpublishingDate.Value);
                processMap.Schedule = await _scheduleService.AddSchedule(schedule);
            }
            else
            {
                processMap.Schedule = null;
            }
            processMap.Users.Clear();

            if(process.UsersDataSourceId != null)
            {
                processMap.ProcessUsersDataSource = await _dataSourceRepository.GetDataSourceById(process.UsersDataSourceId);
            }

            if(process.ProcessUsers != null)
            {
                foreach (UserQuery user in process.ProcessUsers)
                {
                    var newUser = await _userService.AddUser(user);
                    processMap.Users.Add(newUser);
                }
            }

            var processData = await _processRepository.AddInventoryProcess(processMap);
            return processData.Id;
        }

        public async Task<IEnumerable<ProcessResponse>> GetAllProcesses()
        {
            var processes = await _processRepository.GetAllInventoryProcesses();
            return _mapper.Map<IEnumerable<ProcessResponse>>(processes);
        }

        /// <summary>
        ///  Input: Id of process
        ///  Output: process détail
        ///  Description:this function allows to retreive details of process
        /// </summary>
        public async Task<ProcessDetail> GetInventoryProcessDetail(Guid id)
        {
            var process = await _processRepository.LazyLoadProcessById(id);
            var processMapping = _mapper.Map<ProcessDetail>(process);
            processMapping.StepsCount = process.InventorySteps.Count;
            processMapping.UsersCount = process.Users.Count;
            foreach (StepDataModel step in process.InventorySteps)
            {
                processMapping.FieldsCount += step.StepInventoryFields.Count;
            }
            return processMapping;
        }


        /// <summary>
        ///  Input: Id of process and process to modify
        ///  Output: process updated
        ///  Description:this function allows to update process
        /// </summary>
        public async Task<ProcessUpdate> UpdateInventoryProcess(Guid id, ProcessUpdate process)
        {
            var processToUpdate = await _processRepository.GetInventoryProcessLazyLoading(id);
            if (processToUpdate == null)
                return null;
            var inventoryType = await _inventoryTypeRepository.GetInventoryTypeById(process.TypeId);
            processToUpdate.Name = process.Name;
            processToUpdate.Description = process.Description;
            processToUpdate.State = _commonService.SetState(process.PublishingDate, process.UnpublishingDate);
            processToUpdate.InventoryType = inventoryType;
            //retrieve the steps in common between the modify process and the other
            ICollection<StepDataModel> steps = processToUpdate.InventorySteps.Where(s1 => process.Steps.Any(s2 => s2 == s1.Id)).ToList();
            //retrieve new steps
            ICollection<Guid> newSteps = process.Steps.Where(s1 => !processToUpdate.InventorySteps.Any(s2 => s2.Id == s1)).ToList();
            //add the new steps to the process
            foreach (Guid idStep in newSteps)
            {
                var step = await _stepRepository.GetStepById(idStep);
                steps.Add(step);
            }
            processToUpdate.InventorySteps = steps;
            //if the process doesn't have a prior schedule
            if (processToUpdate.Schedule == null)
            {
                //if the new values ​​of the process contains a schedule then create the latter
                if (process.PublishingDate.HasValue || process.UnpublishingDate.HasValue)
                {
                    var schedule = new ScheduleQuery(process.PublishingDate.Value, process.UnpublishingDate.Value);
                    processToUpdate.Schedule = await _scheduleService.AddSchedule(schedule);
                }

            }
            else
            {
                //if the new process values ​​doesn't contain a schedule then delete the schedule
                if (!process.PublishingDate.HasValue && !process.UnpublishingDate.HasValue)
                {
                    Guid _id = processToUpdate.Schedule.Id;
                    processToUpdate.Schedule = null;
                    await _scheduleService.DeleteSchedule(_id);
                }
                else
                {
                    //if the planning dates are changed
                    if ((process.PublishingDate.Value != processToUpdate.Schedule.StartDate) || (process.UnpublishingDate.Value != processToUpdate.Schedule.EndDate))
                    {
                        var scheduleToUpdate = new ScheduleUpdate(processToUpdate.Schedule.Id, process.PublishingDate.Value, process.UnpublishingDate.Value);
                        await _scheduleService.UpdateSchedule(processToUpdate.Schedule.Id, scheduleToUpdate);
                    }
                }

            }
            //if the administrator has deleted the data source then delete the old users linked to the process
            if (processToUpdate.ProcessUsersDataSource != null && process.UsersDataSourceId == null)
            {
                foreach (UserDataModel user in processToUpdate.Users)
                {
                    if (user.InventoryProcesses.Count == 1)
                    {
                        await _userService.DeleteUser(user.Id);
                    }

                }
                processToUpdate.Users = null;
                processToUpdate.ProcessUsersDataSource = null;
            }
            else
            {
                ICollection<UserDataModel> users = new Collection<UserDataModel>();
                //if the administrator has added the data source then add the new users and those who already
                //exist in the database automatically link them with the process
                if (processToUpdate.ProcessUsersDataSource == null && process.UsersDataSourceId != null)
                {
                    foreach (UserQuery user in process.Users)
                    {
                        var result = await _userService.GetUserByUserName(user.Username);
                        if (result == null)
                        {
                            var newUser = await _userService.AddUser(user);
                            users.Add(newUser);
                        }
                        else
                        {
                            users.Add(result);
                        }
                    }
                    processToUpdate.Users = users;
                    processToUpdate.ProcessUsersDataSource = await _dataSourceRepository.GetDataSourceById(process.UsersDataSourceId);
                }
                else
                {
                    //if the administrator did not change the data source but
                    //changed either some or all users
                    if (processToUpdate.ProcessUsersDataSource?.Id == process.UsersDataSourceId)
                    {
                        foreach (UserQuery user in process.Users)
                        {
                            var userExist = processToUpdate.Users.Where(u => u.Username == user.Username).FirstOrDefault();
                            if (userExist != null)
                            {
                                users.Add(userExist);
                            }
                            else
                            {
                                var result = await _userService.GetUserByUserName(user.Username);
                                if (result == null)
                                {
                                    var newUser = await _userService.AddUser(user);
                                    users.Add(newUser);
                                }
                                else
                                {
                                    users.Add(result);
                                }
                            }
                        }
                        ICollection<UserDataModel> usersToDelete = processToUpdate.Users.Where(u1 => !users.Any(u2 => u2.Id == u1.Id)).ToList();
                        foreach (UserDataModel user in usersToDelete)
                        {
                            if (user.InventoryProcesses.Count == 1)
                            {
                                await _userService.DeleteUser(user.Id);
                            }
                        }
                        processToUpdate.Users = users;
                    }
                    //if the administrator has changed the data source then delete the users who
                    //are only linked to this process and add
                    //the new ones if they do not exist in the database
                    else
                    {
                        foreach (UserDataModel user in processToUpdate.Users)
                        {
                            if (user.InventoryProcesses.Count == 1)
                            {
                                await _userService.DeleteUser(user.Id);
                            }
                        }
                        foreach (UserQuery user in process.Users)
                        {
                            users.Add(await _userService.AddUser(user));
                        }
                        processToUpdate.ProcessUsersDataSource = await _dataSourceRepository.GetDataSourceById(process.UsersDataSourceId);
                        processToUpdate.Users = users;
                    }
                }
            }
            await _processRepository.UpdateInventoryProcess(_mapper.Map<ProcessDataModel>(processToUpdate));
            return process;
        }

        /// <summary>
        /// Archives or unarchives an inventory process 
        /// </summary>
        /// <param name="id">Id of the process to archive</param>
        /// <returns>returns true if the process was archived or unarchived successfully, otherwise returns false </returns>
        public async Task<bool> ToggleProcessArchiving(Guid id)
        {
            var processToUpdate = await _processRepository.GetInventoryProcess(id);
            if (processToUpdate == null) return false;
            processToUpdate.IsArchived = !processToUpdate.IsArchived;
            await _processRepository.UpdateInventoryProcess(_mapper.Map<ProcessDataModel>(processToUpdate));
            return true;
        }

        /// <summary>
        /// Favorites or Unfavourites ( star & unstar ) an inventory process 
        /// </summary>
        /// <param name="id">Id of the process to favorite/unfavorite</param>
        /// <returns>returns true if the process was archived or unarchived successfully, otherwise returns false </returns>
        public async Task<bool> ToggleProcessFavorite(Guid id)
        {
            var processToUpdate = await _processRepository.GetInventoryProcess(id);
            if (processToUpdate == null) return false;
            processToUpdate.IsFavorite = !processToUpdate.IsFavorite;
            await _processRepository.UpdateInventoryProcess(_mapper.Map<ProcessDataModel>(processToUpdate));
            return true;
        }


        /// <summary>
        /// Creates a process from an already existing one - still ongoing
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Guid?> CreateProcessFromExisting(Guid id)
        {
            var processToCopy = await _processRepository.LazyLoadProcessById(id);
            if (processToCopy == null) return null;
            foreach (var step in processToCopy.InventorySteps)
            {
                step.Id = Guid.NewGuid();
                if (step.NextInventoryStep != null)
                {
                    step.NextInventoryStep.PreviousInventoryStep.Id = step.Id;
                }
                if (step.PreviousInventoryStep != null)
                {
                    step.PreviousInventoryStep.NextInventoryStep.Id = step.Id;
                }
            }
            processToCopy.Id = Guid.Empty;
            await _processRepository.AddInventoryProcess(processToCopy);
            return processToCopy.Id;

        }

        /// <summary>
        ///  Input: Id of process 
        ///  Output: process 
        ///  Description:this function allows to retrieve process for updating
        /// </summary>
        public async Task<ProcessResponseForUpdate> GetProcessById(Guid id)
        {
            var process = await _processRepository.GetInventoryProcessLazyLoading(id);
            return _mapper.Map<ProcessResponseForUpdate>(process);
        }

        /// <summary>
        /// Get all archived processes
        /// </summary
        /// <returns> return archived processes or null</returns>
        public async Task<IEnumerable<ProcessArchivedResponse>> GetAllArchivedProcesses()
        {
            var processes = await _processRepository.GetAllArchivedProcesses();
            return _mapper.Map<IEnumerable<ProcessArchivedResponse>>(processes);
        }

        /// <summary>
        ///  Input: Id of process
        ///  Output: Stats,Sucess if the process is deleted notExist if the process 
        ///  Description:this function is used to delete process
        /// </summary>
        public async Task<Stats> DeleteProcess(Guid id)
        {
            var process = await _processRepository.GetInventoryProcessLazyLoading(id);
            if (process == null)
                return Stats.NotExist;
            if (process.Schedule != null)
            {
                var schedule = process.Schedule.Id;
                await _scheduleService.DeleteSchedule(schedule);
            }
            foreach (UserDataModel user in process.Users)
            {
                if (user.InventoryProcesses.Count == 1)
                {
                    await _userService.DeleteUser(user.Id);
                }
            }
            await _processRepository.DeleteProcess(process);
            return Stats.Success;

        }
    }
}
