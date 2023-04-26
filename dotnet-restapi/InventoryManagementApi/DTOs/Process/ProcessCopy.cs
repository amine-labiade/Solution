using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;

namespace InventoryManagementApi.DTOs.Process
{
    public class ProcessCopy
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ProcessStateDataModel State { get; set; }
        public int InventoryTypeId { get; set; }
        public ICollection<Guid> InventorySteps{ get; set; }
        public IEnumerable<Guid> UserIds { get; set; }

       /* public class StepCopy
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public Guid NextInventoryStepId { get; set; }
            public Guid PreviousInventoryStepId { get; set; }
            public ICollection<FieldCopy> StepFields { get; set; }

            public class FieldCopy
            {
                public string Label { get; set; }
                public int Position { get; set; }
                public Guid DataSourceId {get; set;}
            }
        }*/
    }
}
