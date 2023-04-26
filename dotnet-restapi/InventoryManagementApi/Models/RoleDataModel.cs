using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Role class
    /// </summary>

    [Table("inv_role")]
    public class RoleDataModel
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public virtual ICollection<UserDataModel> Users { get; set; }
    }
}
