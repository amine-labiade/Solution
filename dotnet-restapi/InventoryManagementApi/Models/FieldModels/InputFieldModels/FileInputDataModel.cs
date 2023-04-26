using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  File input class
    /// </summary>

    [Table("inv_file_input")]
    public class FileInputDataModel : InputFieldDataModel
    {
        public string Type { get; set; }
        public string Extension { get; set; }
        public int MinSize { get; set; }
        public int MaxSize { get; set; }
    }
}
