using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Inventory process class
    /// </summary>

    [Table("inv_process")]
    public class ProcessDataModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; } = DateTime.Now;


        public ProcessStateDataModel State { get; set; }
        public bool IsFavorite { get; set; }
        public bool IsArchived { get; set; }


        [ForeignKey("InventoryType_Id")]
        public virtual InventoryTypeDataModel InventoryType { get; set; }

        [ForeignKey("Schedule_Id")]
        public virtual ScheduleDataModel Schedule { get; set; }

        [ForeignKey("Process_Id")]
        public virtual ICollection<StepDataModel> InventorySteps { get; set; }
 
        public virtual ICollection<UserDataModel> Users { get; set; }

        [ForeignKey("Data_Source_Id")]
        public virtual DataSourceDataModel ProcessUsersDataSource { get; set; }


    }
}
