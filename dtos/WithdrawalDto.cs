using Caretaker.Models.Enums;
using System;

namespace Caretaker.Models.Dtos
{
   public class WithdrawalDto : BaseEntityDto
   {
      public decimal Amount { get; set; }
      public decimal LocalAmount { get; set; }
      public string Reference { get; set; }
      public string TwoLetterISOCountryName { get; set; }
      public string CurrencyISOSymbol { get; set; }
      public DateTime? ProcessedAt { get; set; }
      public WithdrawalStatus Status { get; set; }
      public WithdrawalDestinationType DestinationType { get; set; }
   }

   public class AdminWithdrawalDto : WithdrawalDto
   {
      public EstateLiteDto Estate { get; set; }
      public UserLiteDto User { get; set; }
   }
}
