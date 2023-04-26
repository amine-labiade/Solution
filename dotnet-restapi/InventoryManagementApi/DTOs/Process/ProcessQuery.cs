using InventoryManagementApi.DTOs.User;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;

namespace InventoryManagementApi.DTOs.Process
{
    public class ProcessQuery
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public DateTime? PublishingDate { get; set; }
        public DateTime? UnpublishingDate { get; set; }
        public Guid? UsersDataSourceId { get; set; }
        public ICollection<ProcessStepId> ProcessStepsIds { get; set; }
        public ICollection<UserQuery> ProcessUsers { get; set; }
    }

    public class ProcessStepId
    {
        public Guid StepId { get; set; }
    }

}
