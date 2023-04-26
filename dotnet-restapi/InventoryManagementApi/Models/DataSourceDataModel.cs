using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Data source class
    /// </summary>

    [Table("inv_data_source")]
    public class DataSourceDataModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ConnectionLink { get; set; }
        public string Description { get; set; }
        public DataSourceTypeDataModel Type { get; set; }
        public string UserAccesId { get; set; }
        public string Password { get; set; }
        public string AcessToken { get; set; }
    }
}
