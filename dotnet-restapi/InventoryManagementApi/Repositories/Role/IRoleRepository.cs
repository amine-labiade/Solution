using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.Role
{
    public interface IRoleRepository
    {
        Task<RoleDataModel> GetRoleByName(string roleName);
    }
}
