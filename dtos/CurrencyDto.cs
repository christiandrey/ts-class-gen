using System;

namespace HealthGyro.Models.Dtos
{
   public class CurrencyDto
   {
      public Guid Id { get; set; }
      public bool IsDefault { get; set; }
      public bool IsActive { get; set; }
      public string DisplayName { get; set; }
      public string Symbol { get; set; }
      public string IsoSymbol { get; set; }
      public string TwoLetterISOCountryName { get; set; }
      public string ThreeLetterISOCountryName { get; set; }
      public string CountryName { get; set; }
      public decimal ExchangeRate { get; set; }
      public decimal BaseToCurrencyExchangeRate { get; set; }
      public bool Override { get; set; }
   }
}
