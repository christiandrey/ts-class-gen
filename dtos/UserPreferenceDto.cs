namespace HealthGyro.Models.Dtos
{
   public class UserPreferenceDto
   {
      public bool EnableAppointmentReminders { get; set; }
      public bool EnableEmailNotifications { get; set; }
      public bool EnableMedicationReminders { get; set; }
      public bool EnablePushNotifications { get; set; }
      public string LanguageCode { get; set; }
      public bool MilitaryTimeFormat { get; set; }
   }
}
