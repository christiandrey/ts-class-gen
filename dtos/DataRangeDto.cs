namespace HealthGyro.Models.Dtos
{
   public class DataRangeDto : BaseEntityDto
   {
      public string Name { get; set; }
      public decimal LowerValue { get; set; }
      public decimal UpperValue { get; set; }
      public string Unit { get; set; }
   }
}