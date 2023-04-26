using InventoryManagementApi.DTOs.Field;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services.Field
{
    public interface IFieldService
    {
        Task<Guid> AddField(FieldQuery field);
        Task<T> UpdateField<T>(FieldConfigurationUpdate field);
        Task<bool> DeleteField(Guid id);
        Task<IEnumerable<FieldResponse>> GetAllFields();
        Task<Object> GetFieldDetailsById(Guid id, string category);
    }
}
;