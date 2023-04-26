using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Text output class
    /// </summary>

    [Table("inv_text_output")]
    public class TextOutputDataModel : OutputFieldDataModel
    {
        [DataType(DataType.Text)]
        public string Value { get; set; }
    }
}
