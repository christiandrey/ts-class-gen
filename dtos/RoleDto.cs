using System;
using System.ComponentModel.DataAnnotations;
using Caretaker.Models.Entities;

namespace Caretaker.Models.Dtos
{
   public class RoleDto
   {
      public RoleDto()
      {

      }

      public RoleDto(Role role)
      {
         Id = role.Id;
         Name = role.Name;
         AccessSupport = role.AccessSupport;
         AccessAdmin = role.AccessAdmin;
         CreateUser = role.CreateUser;
         CreateRole = role.CreateRole;
      }

      public Guid Id { get; set; }
      public string Name { get; set; }
      [Required]
      public bool AccessAdmin { get; set; }
      [Required]
      public bool AccessSupport { get; set; }
      [Required]
      public bool CreateUser { get; set; }
      [Required]
      public bool CreateRole { get; set; }
   }
}