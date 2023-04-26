using InventoryManagementApi.DTOs.Step;
using InventoryManagementApi.DTOs.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.Process
{
    public class ProcessResponseForUpdate
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public int TypeId { get; set; }
        public DateTime? PublishingDate { get; set; }
        public DateTime? UnpublishingDate { get; set; }
        public Guid? DataSourceId { get; set; }
        public ICollection<UserResponse> Users { get; set; }
        public ICollection<StepResponse> Steps { get; set; }
    }
}
