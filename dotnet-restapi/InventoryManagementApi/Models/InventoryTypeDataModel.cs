using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Inventory type class
    /// </summary>

    [Table("inv_inventory_type")]
    public class InventoryTypeDataModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
