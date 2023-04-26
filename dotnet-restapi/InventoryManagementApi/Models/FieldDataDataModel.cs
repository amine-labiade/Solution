using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Field data class
    /// </summary>

    [Table("inv_field_data")]
    public class FieldDataDataModel
    {
        public Guid Id { get; set; }
        public string DataReference { get; set; }
        public string DataType { get; set; }
        public string Value { get; set; }
    }
}
