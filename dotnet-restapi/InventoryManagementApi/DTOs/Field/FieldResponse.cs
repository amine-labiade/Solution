using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.Field
{
    public class FieldResponse
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int Position { get; set; }
        public string Category { get; set; }
    }
}
