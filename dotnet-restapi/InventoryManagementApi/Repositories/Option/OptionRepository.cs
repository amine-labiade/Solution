using InventoryManagementApi.Context;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Repositories.Option
{
    public class OptionRepository : IOptionRepository
    {
        private readonly InventoryDbContext _context;

        public OptionRepository(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteOptions(ICollection<OptionDataModel> options)
        {
            _context.Options.RemoveRange(options);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
