using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.User;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.User
{
    public interface IUserService
    {
        Task<Stats> DeleteUser(Guid id);
        Task<UserDataModel> AddUser(UserQuery user);
        Task<UserDataModel> GetUserByUserName(string username);
    }
}
