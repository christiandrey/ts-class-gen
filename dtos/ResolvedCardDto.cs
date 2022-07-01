using Caretaker.Models.Enums;

namespace Caretaker.Models.Dtos
{
   public class ResolvedCardDto
   {
      public string Bin { get; set; }
      public string Last4 { get; set; }
      public int ExpMonth { get; set; }
      public int ExpYear { get; set; }
      public string TwoLetterISOCountryName { get; set; }
      public string CardType { get; set; }
      public string Brand { get; set; }
      public PaymentGateway Gateway { get; set; }
   }
}