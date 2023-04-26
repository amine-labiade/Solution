using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.Common
{
    public class GenericListItem<T>
    {
        public T Value { get; set; }
        public string Label { get; set; }
    }
}
