using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories
{
    public interface IStepRepository
    {
        Task<StepDataModel> GetStepById(Guid? id);
        Task<StepDataModel> AddStep(StepDataModel step);
        Task<StepDataModel> UpdateStep(StepDataModel step);
        Task<Boolean> DeleteStep(StepDataModel step);
    }
}
