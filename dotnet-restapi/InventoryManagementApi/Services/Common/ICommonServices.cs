using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Common
{
    public interface ICommonServices
    {
        public ProcessStateDataModel SetState(DateTime? startDate, DateTime? endDate);
    }
}
