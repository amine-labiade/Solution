using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Slider class
    /// </summary>

    [Table("inv_slider")]
    public class SliderDataModel : InputFieldDataModel
    {
        public int Min { get; set; } = 0;
        public int Max { get; set; } = 100;
    }
}
