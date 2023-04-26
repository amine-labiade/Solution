using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  User class
    /// </summary>

    [Table("inv_step")]
    public class StepDataModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        [DataType(DataType.Text)]
        public string Description { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; } = DateTime.Now;

        [ForeignKey("Next_Step_Id")]
        public virtual StepDataModel NextInventoryStep { get; set; }

        [ForeignKey("Previous_Step_Id")]
        public virtual StepDataModel PreviousInventoryStep { get; set; }

        [ForeignKey("Step_Id")]
        public virtual ICollection<FieldDataModel> StepInventoryFields { get; set; }

    }
}
