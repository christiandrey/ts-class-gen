namespace Caretaker.Models.Dtos
{
   public class ApartmentBalanceDto : BaseEntityDto
   {
      public PaymentAccountDto PaymentAccount { get; set; }
      public decimal Balance { get; set; }
   }
}