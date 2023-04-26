using AutoMapper;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.User;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories.Role;
using InventoryManagementApi.Repositories.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.User
{
    public class UserService:IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public UserService(IMapper mapper, IUserRepository userRepository, IRoleRepository roleRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _roleRepository = roleRepository;
        }

        /// <summary>
        ///  Input: new user
        ///  Output: user
        ///  Description:this function allows to add new user
        /// </summary>
        public async Task<Models.UserDataModel> AddUser(UserQuery user)
        {
            var UserData = _mapper.Map<UserDataModel>(user);
            UserData.Role = await _roleRepository.GetRoleByName(user.RoleName);
            await _userRepository.AddUser(UserData);
            return UserData;
        }

        /// <summary>
        ///  Input: Id of user
        ///  Output: true or false
        ///  Description:this function allows to delete user
        /// </summary>
        public async Task<Stats> DeleteUser(Guid id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
                return Stats.NotExist;
            await _userRepository.DeleteUser(user);
            return Stats.Success;
        }

        /// <summary>
        ///  Input: username
        ///  Output: user or null
        ///  Description:this function allows to retrieve user with username
        /// </summary>
        public async Task<UserDataModel> GetUserByUserName(string username)
        {
            return await _userRepository.GetUserByUsername(username);
        }
    }
}
