namespace HealthGyro.Models.Dtos
{
   public class ActivityLogDto : BaseEntityDto
   {
      public string Description { get; set; }
      public UserLiteDto User { get; set; }

   }
}