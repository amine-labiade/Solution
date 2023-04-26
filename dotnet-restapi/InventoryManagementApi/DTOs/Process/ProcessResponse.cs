using System;
using System.Collections.Generic;

namespace InventoryManagementApi.DTOs.Process
{
    public class ProcessResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string Type { get; set; }
        public string State { get; set; }
        public bool IsFavorite { get; set; }
        public bool IsArchived { get; set; }
        public int StepsCount { get; set; }
        public DateTime PublishingDate { get; set; }
        public DateTime UnpublishingDate { get; set; }
    }
}