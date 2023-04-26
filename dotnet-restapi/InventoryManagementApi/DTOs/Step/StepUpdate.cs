using InventoryManagementApi.DTOs.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.Step
{
    public class StepUpdate
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? PreviousStepId { get; set; }
        public ICollection<FieldConfigurationUpdate> StepFields { get; set; }
    }
}
