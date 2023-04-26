using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.User
{
    public class UserQuery
    {
        public string Username { get; set; }
        public string EncryptedPassword { get; set; }
        public string RoleName { get; set; }
    }
}
