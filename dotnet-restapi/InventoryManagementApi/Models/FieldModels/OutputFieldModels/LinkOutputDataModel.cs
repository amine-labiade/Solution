using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Link output class
    /// </summary>

    [Table("inv_link")]
    public class LinkOutputDataModel : OutputFieldDataModel
    {
        public string DisplayName { get; set; }
        [DataType(DataType.Url)]
        public string Url { get; set; }
    }
}
