using InventoryManagementApi.DTOs.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.Step
{
    public class StepResponseDetails
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string NextStepName { get; set; }
        public string PreviousStepName { get; set; }
        public int FieldsCount { get; set; }
        public ICollection<FieldResponse> StepFields { get; set; }
    }
}
