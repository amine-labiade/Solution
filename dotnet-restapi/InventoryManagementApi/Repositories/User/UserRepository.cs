using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.User
{
    public class UserRepository:IUserRepository
    {
        private readonly InventoryDbContext _context;

        public UserRepository(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<UserDataModel> AddUser(UserDataModel user)
        {
            await _context.Users.AddAsync(user);
            _context.SaveChanges();
            return user;
        }

        public async Task<bool> DeleteUser(UserDataModel user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        ///  Input: Id of user
        ///  Output: user or null
        ///  Description:this function allows to retrieve one user by id from database
        /// </summary>
        public async Task<UserDataModel> GetUserById(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        /// <summary>
        ///  Input: username of user
        ///  Output: user or null
        ///  Description:this function allows to retrieve one user by username from database
        /// </summary>
        public async Task<UserDataModel> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
    }
}
