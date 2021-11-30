namespace HealthGyro.Models.Dtos
{
   public class BillingItemDto : BaseEntityDto
   {
      public string Name { get; set; }
      public string Description { get; set; }
      public decimal UnitPrice { get; set; }
   }
}