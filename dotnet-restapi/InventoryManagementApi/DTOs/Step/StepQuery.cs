using InventoryManagementApi.DTOs.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.Step
{
    public class StepQuery
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public Guid? PreviousStepId { get; set; }
        public ICollection<FieldConfiguration> StepFields {get; set;}
    }
}
