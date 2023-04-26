using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Choice buttons class
    /// </summary>

    [Table("inv_choice_button")]
    public class ChoiceButtonsDataModel : InputFieldDataModel
    {
        public ChoiceButtonsTypeDataModel Type { get; set; }

        [ForeignKey("ChoiceButton_Id")]
        public virtual ICollection<OptionDataModel> Options { get; set; }
    }
}
