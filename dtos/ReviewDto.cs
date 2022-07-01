using System;

namespace Caretaker.Models.Dtos
{
   public class ReviewDto
   {
      public Guid Id { get; set; }
      public int Stars { get; set; }
      public string Body { get; set; }
      public Guid UserId { get; set; }
      public Guid VendorId { get; set; }
      public UserLiteDto User { get; set; }
   }
}