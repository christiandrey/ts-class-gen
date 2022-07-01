using System.ComponentModel.DataAnnotations;

namespace Caretaker.Models.Dtos
{
   public class SocialUserDto
   {
      /// <summary>
      /// Obtained access token for Facebook & ID token for Google
      /// </summary>
      [Required]
      public string AccessToken { get; set; }
   }
}