using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.Option
{
    public interface IOptionRepository
    {
        Task<bool> DeleteOptions(ICollection<OptionDataModel> options);
    }
}
