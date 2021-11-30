using System;
using System.Collections.Generic;
using HealthGyro.Common.Models;
using HealthGyro.Models.Enums;

namespace HealthGyro.Models.Dtos
{
   public class HospitalClinicalVisitsStatsDto
   {
      public TimeDuration TimeDuration { get; set; }
      public DateTime StartDate { get; set; }
      public int NewPatientsCurrentCount { get; set; }
      public int NewPatientsPreviousCount { get; set; }
      public int OldPatientsCurrentCount { get; set; }
      public int OldPatientsPreviousCount { get; set; }
   }

   public class HospitalPatientsStatsDto
   {
      public TimeDuration TimeDuration { get; set; }
      public DateTime StartDate { get; set; }
      public int InPatientsCount { get; set; }
      public int OutPatientsCount { get; set; }
   }

   public class HospitalInvoiceStatsDto
   {
      public TimeDuration TimeDuration { get; set; }
      public DateTime StartDate { get; set; }
      public int TotalInvoicesCount { get; set; }
      public int OutstandingInvoicesCount { get; set; }
   }

   public class HospitalPlottableStatsDto
   {
      public TimeDuration TimeDuration { get; set; }
      public DateTime StartDate { get; set; }
      public List<PlotPoint> PreviousValues { get; set; }
      public List<PlotPoint> CurrentValues { get; set; }
   }
}