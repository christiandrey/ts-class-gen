using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class TransactionDto : BaseEntityDto
   {
      public bool IsCredit { get; set; }
      public decimal Amount { get; set; }
      public string Reference { get; set; }
      public TransactionMode Mode { get; set; }
      public string Description { get; set; }
      public PatientLiteDto Patient { get; set; }
   }
}
