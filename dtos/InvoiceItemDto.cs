namespace HealthGyro.Models.Dtos
{
   public class InvoiceItemDto : BaseEntityDto
   {
      public string Name { get; set; }
      public string Description { get; set; }
      public decimal UnitPrice { get; set; }
      public decimal LocalUnitPrice { get; set; }
      public int Quantity { get; set; }
      public MedicDto Medic { get; set; }
   }
}