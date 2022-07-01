using System;

namespace Caretaker.Models.Dtos
{
   public class LocationDto
   {
      public Guid Id { get; set; }
      public string PlaceId { get; set; }
      public double Latitude { get; set; }
      public double Longitude { get; set; }
      public double Bearing { get; set; }
      public string State { get; set; }
      public string Country { get; set; }
      public string Description { get; set; }
      public string FloorNo { get; set; }
      public string Zipcode { get; set; }
      public bool IsNigeria => Country == "Nigeria";
   }
}