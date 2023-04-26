using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.Role
{
    public class RoleRepository:IRoleRepository
    {
        private readonly InventoryDbContext _context;

        public RoleRepository(InventoryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Input: Role name
        ///  Output: role
        ///  Description:this function allows to retrieve one role from database
        /// </summary>
        public async Task<RoleDataModel> GetRoleByName(string roleName)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.RoleName == roleName);
        }
    }
}
