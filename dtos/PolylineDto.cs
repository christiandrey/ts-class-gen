namespace Caretaker.Models.Dtos
{
   public class PolylineDto
   {
      public string Points { get; set; }

      public PolylineDto(string points)
      {
         Points = points;
      }
   }
}