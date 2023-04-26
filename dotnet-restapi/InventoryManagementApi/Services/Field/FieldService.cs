using AutoMapper;
using InventoryManagementApi.DTOs.Field;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories;
using InventoryManagementApi.Repositories.Field;
using InventoryManagementApi.Repositories.Option;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static InventoryManagementApi.Models.FieldDataModel;

namespace InventoryManagementApi.Services.Field
{
    public class FieldService : IFieldService
    {
        private readonly IFieldRepository _fieldRepository;
        private readonly IDataSourceRepository _dataSourceRepository;
        private readonly IOptionRepository _optionRepository;
        private readonly IMapper _mapper;

        public FieldService(IFieldRepository fieldRepository, IDataSourceRepository dataSourceRepository, IOptionRepository optionRepository, IMapper mapper)
        {
            _fieldRepository = fieldRepository;
            _dataSourceRepository = dataSourceRepository;
            _optionRepository = optionRepository;
            _mapper = mapper;
        }

        public async Task<Guid> AddField(FieldQuery field)
        {
            return await _fieldRepository.AddField(_mapper.Map<FieldDataModel>(field));
        }

        public async Task<bool> DeleteField(Guid id)
        {
            var fieldToDelete = await _fieldRepository.GetFieldById(id);
            if (fieldToDelete == null) return false;
            if (fieldToDelete.Category == FieldCategory.DropdownInput)
            {
                var dropdownField = await _fieldRepository.GetFieldById<DropDownDataModel>(fieldToDelete.Id, fieldToDelete.Category);
                await _optionRepository.DeleteOptions(dropdownField.Options);
            }
            else
            {
                if ((fieldToDelete.Category == FieldCategory.Checkboxes) || (fieldToDelete.Category == FieldCategory.RadioButtons))
                {
                    var choiceButtons = await _fieldRepository.GetFieldById<ChoiceButtonsDataModel>(fieldToDelete.Id, fieldToDelete.Category);
                    await _optionRepository.DeleteOptions(choiceButtons.Options);
                }
            }
            await _fieldRepository.DeleteField(fieldToDelete);
            return true;
        }

        public async Task<IEnumerable<FieldResponse>> GetAllFields()
        {
            return _mapper.Map<ICollection<FieldResponse>>(await _fieldRepository.GetAllFields());
        }


        /// <summary>
        /// get details of field by id and category
        /// </summary>
        /// <param name="id"></param>
        /// <param name="category"></param>
        /// <returns></returns>
        public async Task<object> GetFieldDetailsById(Guid id, string category)
        {
            return await _fieldRepository.GetFieldDetails(id, category);

        }



        public async Task<T> UpdateField<T>(FieldConfigurationUpdate field)
        {
            switch (field.Category)
            {
                case FieldCategory.DateInput:
                    var dateInputSearch = await _fieldRepository.GetFieldById<DateInputDataModel>(field.Id, field.Category);
                    dateInputSearch.Name = field.Name;
                    dateInputSearch.Position = field.Position;
                    dateInputSearch.Label = field.Label;
                    dateInputSearch.IsRequired = field.IsRequired;
                    dateInputSearch.MinDate = field.MinDate;
                    dateInputSearch.MaxDate = field.MaxDate;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<DateInputDataModel>(dateInputSearch, field.Category);
                case FieldCategory.FileInput:
                    var fileInputSearch = await _fieldRepository.GetFieldById<FileInputDataModel>(field.Id, field.Category);
                    fileInputSearch.Name = field.Name;
                    fileInputSearch.Position = field.Position;
                    fileInputSearch.Label = field.Label;
                    fileInputSearch.IsRequired = field.IsRequired;
                    fileInputSearch.MaxSize = field.MaxSize;
                    fileInputSearch.MinSize = field.MinSize;
                    fileInputSearch.Extension = field.FileInputExtension;
                    fileInputSearch.Type = field.FileInputType;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<FileInputDataModel>(fileInputSearch, field.Category);
                case FieldCategory.FileOutput:
                    var fileOutputSearch = await _fieldRepository.GetFieldById<FileOutputDataModel>(field.Id, field.Category);
                    fileOutputSearch.Label = field.Label;
                    fileOutputSearch.Position = field.Position;
                    fileOutputSearch.Extension = field.FileOutputExtension;
                    fileOutputSearch.FilePath = field.FilePath;
                    fileOutputSearch.Type = field.FileOutputType;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<FileOutputDataModel>(fileOutputSearch, field.Category);
                case FieldCategory.LinkOutput:
                    var linkOutputSearch = await _fieldRepository.GetFieldById<LinkOutputDataModel>(field.Id, field.Category);
                    linkOutputSearch.Label = field.Label;
                    linkOutputSearch.Position = field.Position;
                    linkOutputSearch.DisplayName = field.DisplayName;
                    linkOutputSearch.Url = field.Url;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<LinkOutputDataModel>(linkOutputSearch, field.Category);
                case FieldCategory.SliderInput:
                    var sliderSearch = await _fieldRepository.GetFieldById<SliderDataModel>(field.Id, field.Category);
                    sliderSearch.Name = field.Name;
                    sliderSearch.Position = field.Position;
                    sliderSearch.Label = field.Label;
                    sliderSearch.IsRequired = field.IsRequired;
                    sliderSearch.Max = field.SliderMax;
                    sliderSearch.Min = field.SliderMin;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<SliderDataModel>(sliderSearch, field.Category);
                case FieldCategory.TextInput:
                    var textInputSearch = await _fieldRepository.GetFieldById<TextInputDataModel>(field.Id, field.Category);
                    textInputSearch.Label = field.Label;
                    textInputSearch.Position = field.Position;
                    textInputSearch.Name = field.Name;
                    textInputSearch.Placeholder = field.Placeholder;
                    textInputSearch.Type = field.TextInputType;
                    textInputSearch.ValidationRegex = field.ValidationRegex;
                    textInputSearch.Max = field.TextInputMax;
                    textInputSearch.Min = field.TextInputMin;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<TextInputDataModel>(textInputSearch, field.Category);
                case FieldCategory.TextOutput:
                    var textOutputSearch = await _fieldRepository.GetFieldById<TextOutputDataModel>(field.Id, field.Category);
                    textOutputSearch.Label = field.Label;
                    textOutputSearch.Position = field.Position;
                    textOutputSearch.Value = field.Value;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<TextOutputDataModel>(textOutputSearch, field.Category);
                case FieldCategory.DropdownInput:
                    var dropdownSearch = await _fieldRepository.GetFieldById<DropDownDataModel>(field.Id, field.Category);
                    dropdownSearch.Label = field.Label;
                    dropdownSearch.Position = field.Position;
                    dropdownSearch.Name = field.Name;
                    dropdownSearch.DataSource = null;
                    dropdownSearch.IsRequired = field.IsRequired;
                    dropdownSearch.IsMultiselect = field.IsMultiselect;
                    if (field.DataSourceId != null)
                        dropdownSearch.DataSource = await _dataSourceRepository.GetDataSourceById(field.DataSourceId);
                    await _optionRepository.DeleteOptions(dropdownSearch.Options);
                    dropdownSearch.Options.Clear();
                    dropdownSearch.Options = field.Options;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<DropDownDataModel>(dropdownSearch, field.Category);
                default:
                    var choiceButtonSearch = await _fieldRepository.GetFieldById<ChoiceButtonsDataModel>(field.Id, field.Category);
                    choiceButtonSearch.Label = field.Label;
                    choiceButtonSearch.Position = field.Position;
                    choiceButtonSearch.Name = field.Name;
                    choiceButtonSearch.IsRequired = field.IsRequired;
                    choiceButtonSearch.DataSource = null;
                    choiceButtonSearch.Type = field.ChoiceButtonsType;
                    if (field.DataSourceId != null)
                        choiceButtonSearch.DataSource = await _dataSourceRepository.GetDataSourceById(field.DataSourceId);
                    await _optionRepository.DeleteOptions(choiceButtonSearch.Options);
                    choiceButtonSearch.Options.Clear();
                    choiceButtonSearch.Options = field.Options;
                    return (T)(Object)await _fieldRepository.UpdateWithCategory<ChoiceButtonsDataModel>(choiceButtonSearch, field.Category);
            }


        }
    }
}
