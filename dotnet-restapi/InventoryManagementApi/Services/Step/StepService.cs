using AutoMapper;
using InventoryManagementApi.Context;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.Field;
using InventoryManagementApi.DTOs.Step;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories;
using InventoryManagementApi.Repositories.Field;
using InventoryManagementApi.Services.Field;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static InventoryManagementApi.Models.FieldDataModel;

namespace InventoryManagementApi.Services
{
    public class StepService : IStepService
    {
        private readonly IMapper _mapper;
        private readonly IStepRepository _stepRepository;
        private readonly IProcessRepository _processRepository;
        private readonly IFieldRepository _fieldRepository;
        private readonly IFieldService _fieldService;
        private readonly IDataSourceRepository _dataSourceRepository;

        public StepService(IMapper mapper, IStepRepository stepRepository,
            IProcessRepository processRepository, IFieldRepository fieldRepository,
            IFieldService fieldService, IDataSourceRepository dataSourceRepository)
        {
            _mapper = mapper;
            _stepRepository = stepRepository;
            _processRepository = processRepository;
            _fieldRepository = fieldRepository;
            _fieldService = fieldService;
            _dataSourceRepository = dataSourceRepository;
        }




        /// <summary>
        ///  Input: step
        ///  Output: Id of new step 
        ///  Description:this function is used to add a new step
        /// </summary>
        public async Task<Guid> AddStep(StepQuery step)
        {
            var stepData = _mapper.Map<StepDataModel>(step);
            stepData.StepInventoryFields.Clear();
            foreach (var field in step.StepFields)
            {
                switch (field.Category)
                {
                    case FieldCategory.DropdownInput:
                        stepData.StepInventoryFields.Add(_mapper.Map<DropDownDataModel>(field));
                        break;
                    case FieldCategory.FileInput:
                        stepData.StepInventoryFields.Add(_mapper.Map<FileInputDataModel>(field));
                        break;
                    case FieldCategory.SliderInput:
                        stepData.StepInventoryFields.Add(_mapper.Map<SliderDataModel>(field));
                        break;
                    case FieldCategory.RadioButtons:
                        stepData.StepInventoryFields.Add(_mapper.Map<ChoiceButtonsDataModel>(field));
                        break;
                    case FieldCategory.Checkboxes:
                        stepData.StepInventoryFields.Add(_mapper.Map<ChoiceButtonsDataModel>(field));
                        break;
                    case FieldCategory.TextInput:
                        stepData.StepInventoryFields.Add(_mapper.Map<TextInputDataModel>(field));
                        break;
                    case FieldCategory.TextOutput:
                        stepData.StepInventoryFields.Add(_mapper.Map<TextOutputDataModel>(field));
                        break;
                    case FieldCategory.DateInput:
                        stepData.StepInventoryFields.Add(_mapper.Map<DateInputDataModel>(field));
                        break;
                    case FieldCategory.FileOutput:
                        stepData.StepInventoryFields.Add(_mapper.Map<FileOutputDataModel>(field));
                        break;
                    case FieldCategory.LinkOutput:
                        stepData.StepInventoryFields.Add(_mapper.Map<LinkOutputDataModel>(field));
                        break;
                }
            }

            //if this is step without previous
            if (step.PreviousStepId == null)
            {
                stepData.PreviousInventoryStep = null;
                await _stepRepository.AddStep(stepData);
            }
            else
            {
                var previousStep = await _stepRepository.GetStepById(step.PreviousStepId);
                stepData.PreviousInventoryStep = previousStep;
                await _stepRepository.AddStep(stepData);
                previousStep.NextInventoryStep = stepData;
                await _stepRepository.UpdateStep(previousStep);

            }
            return stepData.Id;
        }

        /// <summary>
        ///  Input: Id of step
        ///  Output: boolean,true if the step is deleted false if th step does not exist
        ///  Description:this function is used to delete step
        /// </summary>
        public async Task<Stats> DeleteStep(Guid id)
        {
            var step = await _stepRepository.GetStepById(id);
            if (step == null)
                return Stats.NotExist;
            //if this step has a next
            if (step.NextInventoryStep != null)
            {
                //retrieve the next step and set its previous null
                var nextStep = await _stepRepository.GetStepById(step.NextInventoryStep.Id);
                nextStep.PreviousInventoryStep = null;
                await _stepRepository.UpdateStep(nextStep);
            }
            //if this step has a previous
            if (step.PreviousInventoryStep != null)
            {
                //retrieve the previous step and set its next null
                var previousStep = await _stepRepository.GetStepById(step.PreviousInventoryStep.Id);
                previousStep.NextInventoryStep = null;
                await _stepRepository.UpdateStep(previousStep);
            }
            foreach (FieldDataModel field in step.StepInventoryFields)
            {
                if ((field.Category == FieldCategory.DropdownInput) || (field.Category == FieldCategory.Checkboxes) || (field.Category == FieldCategory.RadioButtons))
                {
                    await _fieldService.DeleteField(field.Id);

                }
            }
            await _stepRepository.DeleteStep(step);
            return Stats.Success;
        }

        /// <summary>
        ///  Input: Id of process
        ///  Output: List of steps without next
        ///  Description:this function allows to retrieve all the steps without 
        ///  next for a process
        /// </summary>
        public async Task<IEnumerable<StepWithoutNextResponse>> GetAllStepsForProcess(Guid idProcess, Guid idPreviousStep, Guid idStep)
        {
            var process = await _processRepository.GetInventoryProcessLazyLoading(idProcess);
            ICollection<StepDataModel> steps = new List<StepDataModel>();
            foreach (StepDataModel step in process.InventorySteps)
            {
                if (step.NextInventoryStep == null)
                {
                    if (step.Id != idStep)
                        steps.Add(step);
                }
            }
            if (idPreviousStep != Guid.Empty)
            {
                var stepCurrent = await _stepRepository.GetStepById(idPreviousStep);
                steps.Add(stepCurrent);
            }
            return _mapper.Map<IEnumerable<StepWithoutNextResponse>>(steps);
        }

        /// <summary>
        ///  Input: Id of step
        ///  Output: step
        ///  Description:this function allows to retrieve step
        /// </summary>
        public async Task<StepResponseDetails> GetStepById(Guid id)
        {
            var step = await _stepRepository.GetStepById(id);
            var stepResponse = _mapper.Map<StepResponseDetails>(step);
            stepResponse.FieldsCount = stepResponse.StepFields.Count;
            return stepResponse;
        }

        /// <summary>
        /// Get details of step for update
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<StepResponseForUpdate> GetStepForUpdate(Guid id)
        {
            var step = await _stepRepository.GetStepById(id);
            var mapstep = _mapper.Map<StepResponseForUpdate>(step);
            ICollection<FieldDataModel> sortedFields = step.StepInventoryFields.OrderBy(f => f.Position).ToList();
            ICollection<Object> fields = new List<Object>();
            foreach (FieldDataModel field in sortedFields)
            {
                var fieldDetails = await _fieldRepository.GetFieldDetails(field.Id, field.Category.ToString());
                fields.Add(fieldDetails);
            }
            mapstep.Fields = fields;
            return mapstep;
        }

        /// <summary>
        ///  Input: Id of step and modified step
        ///  Output: Modified step
        ///  Description:this function allows to update step
        /// </summary>
        public async Task<StepUpdate> UpdateStep(Guid id, StepUpdate step)
        {
            var first = false;
            var stepSearch = await _stepRepository.GetStepById(id);
            if (stepSearch == null)
                return null;
            stepSearch.Name = step.Name;
            stepSearch.Description = step.Description;

            //if the previous step is modified
            if (stepSearch.PreviousInventoryStep?.Id != step.PreviousStepId)
            {
                if (stepSearch.PreviousInventoryStep == null)
                    first = true;
                if (stepSearch.PreviousInventoryStep != null)
                {
                    var oldPreviousStep = await _stepRepository.GetStepById(stepSearch.PreviousInventoryStep.Id);
                    oldPreviousStep.NextInventoryStep = null;
                    await _stepRepository.UpdateStep(oldPreviousStep);
                    stepSearch.PreviousInventoryStep = null;
                }
                if (step.PreviousStepId != null)
                {
                    var newPreviousStep = await _stepRepository.GetStepById(step.PreviousStepId);
                    stepSearch.PreviousInventoryStep = newPreviousStep;
                    if (newPreviousStep.NextInventoryStep == null)
                    {
                        if (stepSearch.PreviousInventoryStep == stepSearch.NextInventoryStep)
                        {
                            stepSearch.NextInventoryStep = null;
                        }
                    }
                    newPreviousStep.NextInventoryStep = stepSearch;
                    if (first == true)
                        newPreviousStep.PreviousInventoryStep = null;
                    await _stepRepository.UpdateStep(newPreviousStep);
                }
            }
            ICollection<FieldDataModel> fieldToDelete = stepSearch.StepInventoryFields.Where(f1 => !step.StepFields.Any(f2 => f2.Id == f1.Id)).ToList();
            foreach (FieldDataModel field in fieldToDelete)
            {
                await _fieldService.DeleteField(field.Id);
            }
            //Fields
            foreach (FieldConfigurationUpdate field in step.StepFields)
            {
                if (field.Id != null)
                {
                    switch (field.Category)
                    {
                        case FieldCategory.DropdownInput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<DropDownDataModel>(field));
                            break;
                        case FieldCategory.FileInput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<FileInputDataModel>(field));
                            break;
                        case FieldCategory.SliderInput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<SliderDataModel>(field));
                            break;
                        case FieldCategory.RadioButtons:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<ChoiceButtonsDataModel>(field));
                            break;
                        case FieldCategory.Checkboxes:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<ChoiceButtonsDataModel>(field));
                            break;
                        case FieldCategory.TextInput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<TextInputDataModel>(field));
                            break;
                        case FieldCategory.TextOutput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<TextOutputDataModel>(field));
                            break;
                        case FieldCategory.DateInput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<DateInputDataModel>(field));
                            break;
                        case FieldCategory.FileOutput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<FileOutputDataModel>(field));
                            break;
                        case FieldCategory.LinkOutput:
                            stepSearch.StepInventoryFields.Add(await _fieldService.UpdateField<LinkOutputDataModel>(field));
                            break;
                    }
                }
                else
                {
                    switch (field.Category)
                    {
                        case FieldCategory.DropdownInput:
                            var dropdownMapper = _mapper.Map<DropDownDataModel>(field);
                            if (dropdownMapper.DataSource != null)
                                dropdownMapper.DataSource = await _dataSourceRepository.GetDataSourceById(field.DataSourceId);
                            stepSearch.StepInventoryFields.Add(dropdownMapper);
                            break;
                        case FieldCategory.FileInput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<FileInputDataModel>(field));
                            break;
                        case FieldCategory.SliderInput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<SliderDataModel>(field));
                            break;
                        case FieldCategory.RadioButtons:
                            var radioButtonMapper = _mapper.Map<ChoiceButtonsDataModel>(field);
                            if (radioButtonMapper.DataSource != null)
                                radioButtonMapper.DataSource = await _dataSourceRepository.GetDataSourceById(field.DataSourceId);
                            stepSearch.StepInventoryFields.Add(radioButtonMapper);
                            break;
                        case FieldCategory.Checkboxes:
                            var checkboxesMapper = _mapper.Map<ChoiceButtonsDataModel>(field);
                            if (checkboxesMapper.DataSource != null)
                                checkboxesMapper.DataSource = await _dataSourceRepository.GetDataSourceById(field.DataSourceId);
                            stepSearch.StepInventoryFields.Add(checkboxesMapper);
                            break;
                        case FieldCategory.TextInput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<TextInputDataModel>(field));
                            break;
                        case FieldCategory.TextOutput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<TextOutputDataModel>(field));
                            break;
                        case FieldCategory.DateInput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<DateInputDataModel>(field));
                            break;
                        case FieldCategory.FileOutput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<FileOutputDataModel>(field));
                            break;
                        case FieldCategory.LinkOutput:
                            stepSearch.StepInventoryFields.Add(_mapper.Map<LinkOutputDataModel>(field));
                            break;
                    }
                }
            }
            await _stepRepository.UpdateStep(stepSearch);
            return step;
        }
    }
}
