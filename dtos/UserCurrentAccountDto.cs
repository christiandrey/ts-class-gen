using System;
using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class UserCurrentAccountDto
   {
      public Guid CurrentAccountId { get; set; }
      public UserAccountType CurrentAccountType { get; set; }
   }
}