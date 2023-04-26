using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static InventoryManagementApi.Models.FieldDataModel;

namespace InventoryManagementApi.Repositories.Field
{
    public interface IFieldRepository
    {
        Task<Guid> AddField(FieldDataModel field);
        Task<T> GetFieldById<T>(Guid? id, FieldCategory category);
        Task<FieldDataModel> GetFieldById(Guid id);
        Task<bool> DeleteField(FieldDataModel field);
        Task<IEnumerable<FieldDataModel>> GetAllFields();
        Task<Guid> UpdateField(FieldDataModel field);
        Task<bool> UpdateFieldInputOutput<T>(T field, FieldCategory category);
        Task<T> UpdateWithCategory<T>(T field, FieldCategory category);
        Task<FieldDataModel> GetFieldsByIdDataSource(Guid idDataSource);
        Task<Object> GetFieldDetails(Guid id, String category);

    }
}
