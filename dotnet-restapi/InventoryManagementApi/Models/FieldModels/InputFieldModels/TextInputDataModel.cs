using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Text input class
    /// </summary>

    [Table("inv_text_input")]
    public class TextInputDataModel : InputFieldDataModel
    {
        public string Type { get; set; }
        public string Max { get; set; }
        public string Min { get; set; }
        public string Placeholder { get; set; }
        public string ValidationRegex { get; set; }
    }
}
