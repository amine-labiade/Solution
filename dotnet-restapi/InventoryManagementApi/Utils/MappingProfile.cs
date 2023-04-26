using AutoMapper;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.DataSource;
using InventoryManagementApi.DTOs.Field;
using InventoryManagementApi.DTOs.Process;
using InventoryManagementApi.DTOs.Schedule;
using InventoryManagementApi.DTOs.Step;
using InventoryManagementApi.DTOs.User;
using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;

namespace InventoryManagementApi.Utils
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            #region Inventory Process Mappings
            CreateMap<ProcessUpdate, ProcessDataModel>().ReverseMap();

            CreateMap<ProcessDataModel, ProcessQuery>()
                .ForPath(dest => dest.Type, src => src.MapFrom(p => p.InventoryType.Id))
                .ForPath(dest => dest.PublishingDate, src => src.MapFrom(p => p.Schedule.StartDate))
                .ForPath(dest => dest.UnpublishingDate, src => src.MapFrom(p => p.Schedule.EndDate))
                .ForPath(dest => dest.ProcessUsers, src => src.MapFrom(p => p.Users))
                .ForPath(dest => dest.ProcessStepsIds, src => src.MapFrom(p => p.InventorySteps))
                .ReverseMap();

            CreateMap<ProcessDataModel, ProcessDetail>()
                .ForPath(dest => dest.Type, src => src.MapFrom(p => p.InventoryType.Title))
                .ForPath(dest => dest.PublishingDate, src => src.MapFrom(p => p.Schedule.StartDate))
                .ForPath(dest => dest.UnpublishingDate, src => src.MapFrom(p => p.Schedule.EndDate))
                .ForPath(dest => dest.ProcessSteps, src => src.MapFrom(p => p.InventorySteps))
                .ForPath(dest => dest.State, src => src.MapFrom(p => p.State))
                .ForPath(dest => dest.DataSource, src => src.MapFrom(p => p.ProcessUsersDataSource.Name))
                .ForPath(dest => dest.Users, src => src.MapFrom(p => p.Users))
                .ReverseMap();

            CreateMap<ProcessDataModel, ProcessUpdate>()
                .ForPath(dest => dest.TypeId, src => src.MapFrom(p => p.InventoryType.Id))
                .ForPath(dest => dest.PublishingDate, src => src.MapFrom(p => p.Schedule.StartDate))
                .ForPath(dest => dest.UnpublishingDate, src => src.MapFrom(p => p.Schedule.EndDate))
                .ForPath(dest => dest.UsersDataSourceId, src => src.MapFrom(p => p.ProcessUsersDataSource.Id))
                .ForPath(dest => dest.Steps, src => src.MapFrom(p => p.InventorySteps))
                .ReverseMap();

            CreateMap<ProcessDataModel, ProcessResponse>()
                .ForPath(dest => dest.Type, src => src.MapFrom(p => p.InventoryType.Title))
                .ForPath(dest => dest.PublishingDate, src => src.MapFrom(p => p.Schedule.StartDate))
                .ForPath(dest => dest.UnpublishingDate, src => src.MapFrom(p => p.Schedule.EndDate))
                .ForPath(dest => dest.State, src => src.MapFrom(p => p.State))
                .ReverseMap();
            CreateMap<ProcessDataModel, ProcessResponseForUpdate>()
                .ForPath(dest => dest.TypeId, src => src.MapFrom(p => p.InventoryType.Id))
                .ForPath(dest => dest.PublishingDate, src => src.MapFrom(p => p.Schedule.StartDate))
                .ForPath(dest => dest.UnpublishingDate, src => src.MapFrom(p => p.Schedule.EndDate))
                 .ForPath(dest => dest.DataSourceId, src => src.MapFrom(p => p.ProcessUsersDataSource.Id))
                 .ForPath(dest => dest.Users, src => src.MapFrom(p => p.Users))
                 .ForPath(dest => dest.Steps, src => src.MapFrom(p => p.InventorySteps))
                 .ReverseMap();
            CreateMap<ProcessDataModel, ProcessArchivedResponse>().ForPath(dest => dest.Type, src => src.MapFrom(p => p.InventoryType.Title))
                                                                   .ReverseMap();
            #endregion

            #region Data source mappings
            CreateMap<DataSourceDataModel, DataSourceQuery>().ReverseMap();
            CreateMap<DataSourceDataModel, DataSourceResponse>()
                .ForPath(dest => dest.Type, src => src.MapFrom(p => p.Type))
                .ReverseMap();
            CreateMap<DataSourceDataModel, DataSourceUpdate>().ReverseMap();
            CreateMap<DataSourceDataModel, GenericListItem<Guid>>()
                .ForPath(dest => dest.Value, s => s.MapFrom(x => x.Id))
                .ForPath(dest => dest.Label, s => s.MapFrom(x => x.Name))
                .ReverseMap();
            #endregion

            #region Step mappings
            CreateMap<StepQuery, StepDataModel>()
                .ForPath(dest => dest.Name, s => s.MapFrom(x => x.Name))
                .ForPath(dest => dest.Description, s => s.MapFrom(x => x.Description))
                .ForPath(dest => dest.CreationDate, s => s.MapFrom(x => x.CreationDate))
                .ForPath(dest => dest.PreviousInventoryStep.Id, s => s.MapFrom(x => x.PreviousStepId))
                .ForPath(dest => dest.StepInventoryFields, s => s.MapFrom(x => x.StepFields))
                .ReverseMap();

            CreateMap<StepDataModel, StepResponse>()
                .ForPath(dest => dest.NextInventoryStepName, s => s.MapFrom(x => x.NextInventoryStep.Name))
                .ReverseMap();

            CreateMap<StepDataModel, StepResponseDetails>()
                .ForPath(dest => dest.Name, s => s.MapFrom(x => x.Name))
                .ForPath(dest => dest.Description, s => s.MapFrom(x => x.Description))
                .ForPath(dest => dest.CreationDate, s => s.MapFrom(x => x.CreationDate))
                .ForPath(dest => dest.NextStepName, s => s.MapFrom(x => x.NextInventoryStep.Name))
                .ForPath(dest => dest.PreviousStepName, s => s.MapFrom(x => x.PreviousInventoryStep.Name))
                .ForPath(dest => dest.StepFields, s => s.MapFrom(x => x.StepInventoryFields)).ReverseMap();
            CreateMap<StepUpdate, StepDataModel>()
                .ForPath(dest => dest.Id, s => s.MapFrom(x => x.Id))
                .ForPath(dest => dest.Name, s => s.MapFrom(x => x.Name))
                .ForPath(dest => dest.Description, s => s.MapFrom(x => x.Description))
                .ForPath(dest => dest.PreviousInventoryStep.Id, s => s.MapFrom(x => x.PreviousStepId))
                .ForPath(dest => dest.StepInventoryFields, s => s.MapFrom(x => x.StepFields))
                .ReverseMap();

            CreateMap<StepDataModel, StepResponseForUpdate>()
                .ForPath(dest => dest.PreviousStepId, s => s.MapFrom(x => x.PreviousInventoryStep.Id))
                .ReverseMap();
            CreateMap<StepDataModel, StepWithoutNextResponse>()
                .ForPath(dest => dest.PreviousStepId, src => src.MapFrom(x => x.PreviousInventoryStep.Id))
                .ForPath(dest => dest.PreviousStepName, src => src.MapFrom(x => x.PreviousInventoryStep.Name))
                .ForPath(dest => dest.NextStepId, src => src.MapFrom(x => x.NextInventoryStep.Id))
                .ForPath(dest => dest.NextStepName, src => src.MapFrom(x => x.NextInventoryStep.Name))
                .ReverseMap();
            #endregion

            #region Field mappings
            CreateMap<FieldDataModel, FieldResponse>()
                .ForPath(dest => dest.Category, src => src.MapFrom(p => p.Category))
                .ReverseMap();
            CreateMap<FieldDataModel, FieldQuery>().ReverseMap();
            CreateMap<FieldDataModel, FieldUpdate>().ReverseMap();

            #endregion

            #region Helper Classes Mappings
            CreateMap<ProcessStepId, StepDataModel>()
                .ForPath(dest => dest.Id, src => src.MapFrom(g => g.StepId))
                .ReverseMap();

            CreateMap<FieldConfiguration, FieldDataModel>().ReverseMap();


            CreateMap<FieldConfiguration, DropDownDataModel>()
                .ReverseMap();

            CreateMap<FieldConfiguration, FileInputDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.FileInputType))
                .ForPath(dest => dest.Extension, src => src.MapFrom(x => x.FileInputExtension))
                .ReverseMap();

            CreateMap<FieldConfiguration, SliderDataModel>()
                .ForPath(dest => dest.Min, src => src.MapFrom(x => x.SliderMin))
                .ForPath(dest => dest.Max, src => src.MapFrom(x => x.SliderMin))
                .ReverseMap();

            CreateMap<FieldConfiguration, ChoiceButtonsDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.ChoiceButtonsType))
                .ReverseMap();

            CreateMap<FieldConfiguration, TextInputDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.TextInputType))
                .ForPath(dest => dest.Max, src => src.MapFrom(x => x.TextInputMax))
                .ForPath(dest => dest.Min, src => src.MapFrom(x => x.TextInputMin))
                .ReverseMap();

            CreateMap<FieldConfiguration, DateInputDataModel>().ReverseMap();

            CreateMap<FieldConfiguration, TextOutputDataModel>().ReverseMap();
            CreateMap<FieldConfiguration, FileOutputDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.FileOutputType))
                .ForPath(dest => dest.Extension, src => src.MapFrom(x => x.FileOutputExtension))
                .ReverseMap();
            CreateMap<FieldConfiguration, LinkOutputDataModel>()
                .ForPath(dest => dest.Url, src => src.MapFrom(x => x.Url))
                .ReverseMap();

            CreateMap<FieldConfigurationUpdate, FieldDataModel>()
                .ReverseMap();


            CreateMap<FieldConfigurationUpdate, DropDownDataModel>()
                .ForPath(dest => dest.DataSource.Id, src => src.MapFrom(x => x.DataSourceId))
                .ReverseMap();

            CreateMap<FieldConfigurationUpdate, FileInputDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.FileInputType))
                .ForPath(dest => dest.Extension, src => src.MapFrom(x => x.FileInputExtension))
                .ReverseMap();

            CreateMap<FieldConfigurationUpdate, SliderDataModel>()
                .ForPath(dest => dest.Min, src => src.MapFrom(x => x.SliderMin))
                .ForPath(dest => dest.Max, src => src.MapFrom(x => x.SliderMax))
                .ReverseMap();

            CreateMap<FieldConfigurationUpdate, ChoiceButtonsDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.ChoiceButtonsType))
                .ForPath(dest => dest.DataSource.Id, src => src.MapFrom(x => x.DataSourceId))
                .ReverseMap();

            CreateMap<FieldConfigurationUpdate, TextInputDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.TextInputType))
                .ForPath(dest => dest.Max, src => src.MapFrom(x => x.TextInputMax))
                .ForPath(dest => dest.Min, src => src.MapFrom(x => x.TextInputMin))
                .ReverseMap();

            CreateMap<FieldConfigurationUpdate, DateInputDataModel>().ReverseMap();

            CreateMap<FieldConfigurationUpdate, TextOutputDataModel>().ReverseMap();
            CreateMap<FieldConfigurationUpdate, FileOutputDataModel>()
                .ForPath(dest => dest.Type, src => src.MapFrom(x => x.FileOutputType))
                .ForPath(dest => dest.Extension, src => src.MapFrom(x => x.FileOutputExtension))
                .ReverseMap();
            CreateMap<FieldConfigurationUpdate, LinkOutputDataModel>()
                .ForPath(dest => dest.Url, src => src.MapFrom(x => x.Url))
                .ReverseMap();

            #endregion

            #region InventoryType Mappings
            CreateMap<InventoryTypeDataModel, GenericListItem<int>>()
                .ForPath(dest => dest.Value, s => s.MapFrom(x => x.Id))
                .ForPath(dest => dest.Label, s => s.MapFrom(x => x.Title))
                .ReverseMap();
            #endregion

            #region Schedule Mappings
            CreateMap<ScheduleDataModel, ScheduleQuery>()
                .ReverseMap();
            CreateMap<ScheduleDataModel, ScheduleUpdate>()
                .ReverseMap();

            #endregion

            #region User Mappings
            CreateMap<UserDataModel, UserQuery>()
                .ForPath(dest => dest.RoleName, src => src.MapFrom(p => p.Role.RoleName))
                .ReverseMap();
            CreateMap<UserDataModel, UserResponse>()
                .ReverseMap();
            CreateMap<UserDataModel, UserDetail>()
                .ForPath(dest => dest.RoleName, src => src.MapFrom(p => p.Role.RoleName))
                .ReverseMap();
            #endregion

        }


    }
}
