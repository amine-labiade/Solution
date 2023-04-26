using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Common
{
    public interface IDecryption
    {
        public string DecryptStringAES(string password);
    }
}
