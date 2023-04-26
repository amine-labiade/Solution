using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  User class
    /// </summary>
    
    [Table("inv_user")]
    public class UserDataModel
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string EncryptedPassword { get; set; }

        [ForeignKey("Role_Id")]
        public virtual RoleDataModel Role { get; set; }

        public virtual ICollection<ProcessDataModel> InventoryProcesses { get; set; }
    }
}
