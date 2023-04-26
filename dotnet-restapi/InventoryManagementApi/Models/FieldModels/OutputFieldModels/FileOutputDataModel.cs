using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  File output class
    /// </summary>

    [Table("inv_file_output")]
    public class FileOutputDataModel : OutputFieldDataModel
    {
        public string Type { get; set; }
        public string Extension { get; set; }
        public string FilePath { get; set; }
    }
}
