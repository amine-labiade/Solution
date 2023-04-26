using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.DataSource
{
    public class DataSourceQuery
    {
        public string Name { get; set; }
        public string ConnectionLink { get; set; }
        public string Description { get; set; }
        public DataSourceTypeDataModel Type { get; set; }
        public string UserAccesId { get; set; }
        public string Password { get; set; }
        public string AcessToken { get; set; }
    }
}
