using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Step;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services
{
    public interface IStepService
    {
        Task<Guid> AddStep(StepQuery step);
        Task<IEnumerable<StepWithoutNextResponse>> GetAllStepsForProcess(Guid idProcess, Guid idPreviousStep, Guid idStep);
        Task<StepResponseDetails> GetStepById(Guid id);
        Task<Stats> DeleteStep(Guid id);
        Task<StepUpdate> UpdateStep(Guid id, StepUpdate step);
        Task<StepResponseForUpdate> GetStepForUpdate(Guid id);
    }
}
