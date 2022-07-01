using System;

namespace Caretaker.Models.Dtos
{
   public class OrganizationWalletDto
   {
      public Guid Id { get; set; }
      public decimal Balance { get; set; }
      public decimal LockedBalance { get; set; }
      public decimal ActualBalance { get; set; }
   }
}
