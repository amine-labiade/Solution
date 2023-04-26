using InventoryManagementApi.DTOs.User;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;

namespace InventoryManagementApi.DTOs.Process
{
    public class ProcessUpdate
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TypeId { get; set; }
        public DateTime? PublishingDate { get; set; }
        public DateTime? UnpublishingDate { get; set; }
        public Guid? UsersDataSourceId { get; set; }
        public ICollection<UserQuery> Users { get; set; }
        public ICollection<Guid> Steps { get; set; }
    }
}
