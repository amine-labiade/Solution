using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Input field class
    /// </summary>

    [Table("inv_input_field")]
    public class InputFieldDataModel : FieldDataModel
    {
        public string Name { get; set; }
        public bool ? IsRequired { get; set; }
    }
}
