using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.User
{
    public interface IUserRepository
    {
        Task<Boolean> DeleteUser(UserDataModel user);
        Task<UserDataModel> GetUserById(Guid id);
        Task<UserDataModel> AddUser(UserDataModel user);
        Task<UserDataModel> GetUserByUsername(string username);
    }
}
