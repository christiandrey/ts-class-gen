using System;
using System.Collections.Generic;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class InvoiceLiteDto : BaseEntityDto
   {
      public InvoiceStatus Status { get; set; }
      public Guid ClinicalVisitId { get; set; }
      public TransactionDto Transaction { get; set; }
      public NonMedicDto NonMedic { get; set; }
   }

   public class InvoiceDto : InvoiceLiteDto
   {
      public List<InvoiceItemDto> Items { get; set; }
   }
}