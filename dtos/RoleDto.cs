using System;
using System.ComponentModel.DataAnnotations;
using HealthGyro.Models.Entities;

namespace HealthGyro.Models.Dtos
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
         AccessAdmin = role.AccessAdmin;
         AccessMedicAppointments = role.AccessMedicAppointments;
         AccessFullPatientRecords = role.AccessFullPatientRecords;
         AccessHospitalAdmissions = role.AccessHospitalAdmissions;
         AccessHospitalFinances = role.AccessHospitalFinances;
         AccessPatientMedications = role.AccessPatientMedications;
         AccessPatientPaymentRecords = role.AccessPatientPaymentRecords;
         AccessSummarizedPatientRecords = role.AccessSummarizedPatientRecords;
         AnswerMedicalEnquiries = role.AnswerMedicalEnquiries;
         AnswerNonMedicalEnquiries = role.AnswerNonMedicalEnquiries;
         CreateRole = role.CreateRole;
         CreateUser = role.CreateUser;
         ManageHospitalPrices = role.AccessAdmin;
         UploadLabTestResults = role.UploadLabTestResults;
      }

      public Guid Id { get; set; }
      public string Name { get; set; }
      [Required]
      public bool AccessAdmin { get; set; }
      [Required]
      public bool AccessMedicAppointments { get; set; }
      [Required]
      public bool AccessFullPatientRecords { get; set; }
      [Required]
      public bool AccessHospitalAdmissions { get; set; }
      [Required]
      public bool AccessHospitalFinances { get; set; }
      [Required]
      public bool AccessPatientMedications { get; set; }
      [Required]
      public bool AccessPatientPaymentRecords { get; set; }
      [Required]
      public bool AccessSummarizedPatientRecords { get; set; }
      [Required]
      public bool AnswerMedicalEnquiries { get; set; }
      [Required]
      public bool AnswerNonMedicalEnquiries { get; set; }
      [Required]
      public bool CreateRole { get; set; }
      [Required]
      public bool CreateUser { get; set; }
      [Required]
      public bool ManageHospitalPrices { get; set; }
      [Required]
      public bool UploadLabTestResults { get; set; }
   }
}