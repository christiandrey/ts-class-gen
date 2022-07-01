﻿using System;

namespace Caretaker.Models.Dtos
{
   public class FaqDto
   {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public string ImageUrl { get; set; }
      public FaqCategoryDto FaqCategory { get; set; }
   }
}