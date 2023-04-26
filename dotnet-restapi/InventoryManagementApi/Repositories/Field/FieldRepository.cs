using InventoryManagementApi.Context;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static InventoryManagementApi.Models.FieldDataModel;

namespace InventoryManagementApi.Repositories.Field
{
    public class FieldRepository : IFieldRepository
    {
        private readonly InventoryDbContext _context;

        public FieldRepository(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> AddField(FieldDataModel field)
        {
            await _context.Fields.AddAsync(field);
            _context.SaveChanges();
            return field.Id;
        }

        public async Task<bool> DeleteField(FieldDataModel field)
        {
            _context.Fields.Remove(field);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<FieldDataModel>> GetAllFields()
        {
            return await _context.Fields.ToListAsync();
        }

        public async Task<T> GetFieldById<T>(Guid? id, FieldCategory category)
        {
            switch (category)
            {
                case FieldCategory.DateInput:
                    return (T)(Object)await _context.DateInputs.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.FileInput:
                    return (T)(Object)await _context.FileInputs.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.FileOutput:
                    return (T)(Object)await _context.FileOutputs.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.LinkOutput:
                    return (T)(Object)await _context.LinkOutputs.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.SliderInput:
                    return (T)(Object)await _context.Sliders.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.TextInput:
                    return (T)(Object)await _context.TextInputs.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.TextOutput:
                    return (T)(Object)await _context.TextOutputs.FirstOrDefaultAsync(f => f.Id == id);
                case FieldCategory.DropdownInput:
                    return (T)(Object)await _context.DropDowns.Include(x => x.DataSource).Include(x => x.Options).FirstOrDefaultAsync(f => f.Id == id);
                default:
                    return (T)(Object)await _context.ChoiceButtons.Include(x => x.DataSource).Include(x => x.Options).FirstOrDefaultAsync(f => f.Id == id);
            }


        }

        public async Task<FieldDataModel> GetFieldById(Guid id)
        {
            return await _context.Fields.FirstOrDefaultAsync(f => f.Id == id);
        }



        /// <summary>
        /// get details of a field according to the category
        /// </summary>
        /// <param name="id"></param>
        /// <param name="category"></param>
        /// <returns></returns>
        public async Task<object> GetFieldDetails(Guid id, string category)
        {
            if (category == Constants.DropdownInput)
                return await _context.DropDowns.Include(x => x.DataSource).Include(x => x.Options).SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.FileInput)
                return await _context.FileInputs.SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.SliderInput)
                return await _context.Sliders.SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.TextInput)
                return await _context.TextInputs.SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.DateInput)
                return await _context.DateInputs.SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.TextOutput)
                return await _context.TextOutputs.SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.FileOutput)
                return await _context.FileOutputs.Include(x => x.DataSource).SingleOrDefaultAsync(f => f.Id == id);
            if (category == Constants.LinkOutput)
                return await _context.LinkOutputs.SingleOrDefaultAsync(f => f.Id == id);
            return await _context.ChoiceButtons.Include(x => x.DataSource).Include(x => x.Options).SingleOrDefaultAsync(f => f.Id == id);

        }

        /// <summary>
        ///  Input: id of data source
        ///  Output: the first field that has the data source or null
        ///  Description:this function allows to retrieve the field that has this datasource from database
        /// </summary>
        public async Task<FieldDataModel> GetFieldsByIdDataSource(Guid idDataSource)
        {
            return await _context.Fields.FirstOrDefaultAsync(f => f.DataSource.Id == idDataSource);
        }

        public async Task<Guid> UpdateField(FieldDataModel field)
        {
            _context.Fields.Update(field);
            await _context.SaveChangesAsync();
            return field.Id;
        }

        public async Task<bool> UpdateFieldInputOutput<T>(T field, FieldCategory category)
        {
            if ((category == FieldCategory.TextOutput) || (category == FieldCategory.LinkOutput) || (category == FieldCategory.FileOutput))
            {
                _context.OutputFields.Update((OutputFieldDataModel)(Object)field);
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.InputFields.Update((InputFieldDataModel)(Object)field);
                await _context.SaveChangesAsync();
            }
            return true;

        }

        public async Task<T> UpdateWithCategory<T>(T field, FieldCategory category)
        {
            await _context.Entry(field).ReloadAsync();
            switch (category)
            {
                case FieldCategory.DateInput: _context.DateInputs.Update((DateInputDataModel)(Object)field); break;
                case FieldCategory.FileInput: _context.FileInputs.Update((FileInputDataModel)(Object)field); break;
                case FieldCategory.FileOutput: _context.FileOutputs.Update((FileOutputDataModel)(Object)field); break;
                case FieldCategory.LinkOutput: _context.LinkOutputs.Update((LinkOutputDataModel)(Object)(field)); break;
                case FieldCategory.SliderInput: _context.Sliders.Update((SliderDataModel)(Object)field); break;
                case FieldCategory.TextInput: _context.TextInputs.Update((TextInputDataModel)(Object)field); break;
                case FieldCategory.TextOutput: _context.TextOutputs.Update((TextOutputDataModel)(Object)field); break;
                case FieldCategory.DropdownInput: _context.DropDowns.Update((DropDownDataModel)(Object)field);
                                    _context.Entry(field).State = EntityState.Modified;
                                    break;
                default: _context.ChoiceButtons.Update((ChoiceButtonsDataModel)(Object)field); 
                                    _context.Entry(field).State = EntityState.Modified;
                                    break;
            }

            await _context.SaveChangesAsync();
            return (T)(Object)field;
        }
    }
}
