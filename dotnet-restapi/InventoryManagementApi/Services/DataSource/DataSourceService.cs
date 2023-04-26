using AutoMapper;
using InventoryManagementApi.DTOs.Common;
using InventoryManagementApi.DTOs.DataSource;
using InventoryManagementApi.Models;
using InventoryManagementApi.Repositories;
using InventoryManagementApi.Repositories.Field;
using InventoryManagementApi.Services.Common;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace InventoryManagementApi.Services
{
    public class DataSourceService : IDataSourceService
    {
        private readonly IMapper _mapper;
        private readonly IDataSourceRepository _dataSourceRepository;
        private readonly IFieldRepository _fieldRepository;
        private readonly IDecryption _decryption;

        public DataSourceService(IMapper mapper, IDataSourceRepository dataSourceRepository, IFieldRepository fieldRepository, IDecryption decryption)
        {
            _mapper = mapper;
            _dataSourceRepository = dataSourceRepository;
            _fieldRepository = fieldRepository;
            _decryption = decryption;
        }




        /// <summary>
        ///  Input: data source
        ///  Output: Id of new data source
        ///  Description:this function is used to add a new data source
        /// </summary>
        public async Task<Guid> AddDataSource(DataSourceQuery dataSource)
        {
            var dataSourceData = _mapper.Map<DataSourceDataModel>(dataSource);
            await _dataSourceRepository.AddDataSource(dataSourceData);

            return dataSourceData.Id;
        }

        /// <summary>
        ///  Input: ----
        ///  Output: List of data sources
        ///  Description:this function allows to retrieve all data sources
        /// </summary>
        public async Task<IEnumerable<DataSourceResponse>> GetAllDataSources()
        {
            var dataSources = await _dataSourceRepository.GetAllDataSources();
            return _mapper.Map<IEnumerable<DataSourceResponse>>(dataSources);

        }

        /// <summary>
        ///  Input: Id of data source
        ///  Output: data source
        ///  Description:this function allows to retrieve data source
        /// </summary>
        public async Task<DataSourceQuery> GetDataSourceById(Guid? id)
        {
            var dataSource = await _dataSourceRepository.GetDataSourceById(id);
            return _mapper.Map<DataSourceQuery>(dataSource);
        }

        /// <summary>
        ///  Input: Id of data source
        ///  Output: Stats,Sucess if the data source is deleted notExist if the data source 
        ///  does not exist and IsForeignKey if data source it is already in use
        ///  Description:this function is used to delete data source
        /// </summary>
        public async Task<Stats> DeleteDataSource(Guid id)
        {
            var dataSource = await _dataSourceRepository.GetDataSourceById(id);
            if (dataSource == null)
                return Stats.NotExist;
            if (await _fieldRepository.GetFieldsByIdDataSource(id) != null)
                return Stats.IsForeignKey;
            await _dataSourceRepository.DeleteDataSource(dataSource);
            return Stats.Success;

        }

        /// <summary>
        ///  Input: Id of datasource and  modified data source
        ///  Output: Modified data source
        ///  Description:this function allows to update data source
        /// </summary>
        public async Task<DataSourceUpdate> UpdateDataSource(Guid id, DataSourceUpdate dataSource)
        {
            var dataSourceSearch = await _dataSourceRepository.GetDataSourceById(id);
            if (dataSourceSearch == null)
                return null;
            dataSourceSearch.Name = dataSource.Name;
            dataSourceSearch.ConnectionLink = dataSource.ConnectionLink;
            dataSourceSearch.Description = dataSource.Description;
            dataSourceSearch.Type = dataSource.Type;
            dataSourceSearch.UserAccesId = dataSource.UserAccesId;
            dataSourceSearch.Password = dataSource.Password;
            dataSourceSearch.AcessToken = dataSource.AcessToken;

            await _dataSourceRepository.UpdateDataSource(_mapper.Map<DataSourceDataModel>(dataSourceSearch));
            return dataSource;
        }

        /// <summary>
        ///  Input: --------
        ///  Output: List of data sources
        ///  Description:this function allows us to retrieve data sources
        /// </summary>
        public async Task<IEnumerable<GenericListItem<Guid>>> GetAllDataSourcesItems()
        {
            var dataSources = await _dataSourceRepository.GetAllDataSources();
            return _mapper.Map<IEnumerable<GenericListItem<Guid>>>(dataSources);
        }

        /// <summary>
        ///  Input: id of data source
        ///  Output: List of users
        ///  Description:this function allows users to be retrieved from another API using id
        ///  data source
        /// </summary>
        public async Task<IEnumerable<UsersApi>> GetUsersFromApi(Guid id)
        {
            var dataSource = await _dataSourceRepository.GetDataSourceById(id);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage response = null;
                if (dataSource.UserAccesId != null)
                {
                    var decryptedPassword = _decryption.DecryptStringAES(dataSource.Password);
                    byte[] bytes = Encoding.ASCII.GetBytes($"{dataSource.UserAccesId}:{decryptedPassword}");
                    string base64 = Convert.ToBase64String(bytes);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
                    response = await httpClient.GetAsync(dataSource.ConnectionLink);
                }
                else
                {
                    if (dataSource.AcessToken != null)
                    {
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", dataSource.AcessToken);
                        response = await httpClient.GetAsync(dataSource.ConnectionLink);
                    }
                    else
                    {
                        response = await httpClient.GetAsync(dataSource.ConnectionLink);
                    }
                }
                if (response.IsSuccessStatusCode)
                {
                    var jsonMessage = await response.Content.ReadAsStringAsync();
                    dynamic json = JsonConvert.DeserializeObject(jsonMessage);
                    string jsonString = JsonConvert.SerializeObject(json);
                    IEnumerable<UsersApi> Users = JsonConvert.DeserializeObject<IEnumerable<UsersApi>>(jsonString);
                    return Users;
                }

            }
            return null;
        }

        /// <summary>
        /// get data from external api
        /// </summary>
        /// <param name="id">id of the data source</param>
        /// <returns></returns>
        public async Task<IEnumerable<GenericListItem<string>>> GetOptionsFromApi(Guid id)
        {
            var dataSource = await _dataSourceRepository.GetDataSourceById(id);
            using (HttpClient httpClient = new HttpClient())
            {
                HttpResponseMessage response = null;
                if (dataSource.UserAccesId != null)
                {
                    var decryptedPassword = _decryption.DecryptStringAES(dataSource.Password);
                    byte[] bytes = Encoding.ASCII.GetBytes($"{dataSource.UserAccesId}:{decryptedPassword}");
                    string base64 = Convert.ToBase64String(bytes);
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", base64);
                    response = await httpClient.GetAsync(dataSource.ConnectionLink);
                }
                else
                {
                    if (dataSource.AcessToken != null)
                    {
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", dataSource.AcessToken);
                        response = await httpClient.GetAsync(dataSource.ConnectionLink);
                    }
                    else
                    {
                        response = await httpClient.GetAsync(dataSource.ConnectionLink);
                    }
                }
                if (response.IsSuccessStatusCode)
                {
                    var jsonMessage = await response.Content.ReadAsStringAsync();
                    dynamic json = JsonConvert.DeserializeObject(jsonMessage);
                    string jsonString = JsonConvert.SerializeObject(json);
                    IEnumerable<GenericListItem<string>> data = JsonConvert.DeserializeObject<IEnumerable<GenericListItem<string>>>(jsonString);
                    return data;
                }

            }
            return null;
        }
    }
}
