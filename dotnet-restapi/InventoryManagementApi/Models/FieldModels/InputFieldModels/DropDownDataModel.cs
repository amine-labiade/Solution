using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Dropdown class
    /// </summary>

    [Table("inv_dropdown")]
    public class DropDownDataModel : InputFieldDataModel
    {
        public bool IsMultiselect { get; set; }

        [ForeignKey("Dropdown_Id")]
        public virtual ICollection<OptionDataModel> Options { get; set; }
    }
}
