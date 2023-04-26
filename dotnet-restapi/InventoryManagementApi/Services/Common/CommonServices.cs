using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Common
{
    public class CommonServices : ICommonServices
    {
        public ProcessStateDataModel SetState(DateTime? startDate, DateTime? endDate)
        {
            var dateOfDay = DateTime.Now;
            if (startDate != null && endDate != null)
            {
                if (startDate <= dateOfDay && endDate >= dateOfDay)
                {
                    return ProcessStateDataModel.Published;
                }
                if (startDate > dateOfDay && endDate > dateOfDay)
                {
                    return ProcessStateDataModel.Scheduled;
                }
            }
            else
            {
                return ProcessStateDataModel.Unpublished;
            }
            return ProcessStateDataModel.Unpublished;
        }
    }
}
