using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Options class
    /// </summary>

    [Table("inv_option")]
    public class OptionDataModel
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public bool? IsDefault { get; set; }
        public string referenceId { get; set; }
    }
}
