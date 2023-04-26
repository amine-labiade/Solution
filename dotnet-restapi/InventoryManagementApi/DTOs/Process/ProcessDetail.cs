using InventoryManagementApi.DTOs.Step;
using InventoryManagementApi.DTOs.User;
using System;
using System.Collections.Generic;

namespace InventoryManagementApi.DTOs.Process
{
    public class ProcessDetail
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string Type { get; set; }
        public string State { get; set; }
        public bool IsFavorite { get; set; }
        public int StepsCount { get; set; }
        public int FieldsCount { get; set; }
        public int UsersCount { get; set; }
        public DateTime? PublishingDate { get; set; }
        public DateTime? UnpublishingDate { get; set; }
        public string DataSource { get; set; }
        public ICollection<StepResponse> ProcessSteps { get; set; }
        public ICollection<UserDetail> Users { get; set; }
    }



}
