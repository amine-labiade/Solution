using AutoMapper;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories.InventoryType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.InventoryType
{
    public class InventoryTypeService : IIventoryTypeService
    {
        private readonly IMapper _mapper;
        private readonly IInventoryTypeRepository _inventoryTypeRepository;

        public InventoryTypeService(IMapper mapper, IInventoryTypeRepository inventoryTypeRepository)
        {
            _mapper = mapper;
            _inventoryTypeRepository = inventoryTypeRepository;
        }

        /// <summary>
        ///  Input: --------
        ///  Output: List of inventory types
        ///  Description:this function allows to retrieve inventory types
        /// </summary>
        public async Task<IEnumerable<GenericListItem<int>>> GetAllInventoryTypes()
        {
            var inventoryTypes = await _inventoryTypeRepository.GetAllInventoryTypes();
            return _mapper.Map<IEnumerable<GenericListItem<int>>>(inventoryTypes);
        }

        /// <summary>
        ///  Input: Id of inventory type
        ///  Output: inventory type or null
        ///  Description:this function allows to retrieve inventory type
        /// </summary>
        public async Task<InventoryTypeDataModel> GetInventoryById(int id)
        {
            return await _inventoryTypeRepository.GetInventoryTypeById(id);

        }
    }
}
