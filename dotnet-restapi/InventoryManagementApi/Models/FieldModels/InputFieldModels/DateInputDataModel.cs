using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Models
{
    [Table("inv_date_input")]
    public class DateInputDataModel : InputFieldDataModel
    {
        public DateTime MaxDate { get; set; }
        public DateTime MinDate { get; set; }
    }
}
