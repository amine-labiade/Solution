using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.DTOs.User
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }
}
