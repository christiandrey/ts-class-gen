﻿using System.ComponentModel.DataAnnotations;

namespace HealthGyro.Models.Dtos
{
   public class ResetPasswordDto
   {
      [Required, EmailAddress]
      public string Email { get; set; }
      [Required]
      public string Code { get; set; }
      [Required]
      public string Password { get; set; }
   }
}
