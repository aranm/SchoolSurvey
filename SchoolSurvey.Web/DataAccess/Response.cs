using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSurvey.Web.DataAccess {
   public partial class Response {
      public object CopyTo() {
         return new {
            id = Id,
            questionTitle = this.Title
         };
      }

      public object CopyToForStatistics() {
         var allParentResponses = this.ParentResponses.ToList();
         var sum = allParentResponses.Sum(item => item.Spent);
         float average = 0;

         if (allParentResponses.Any()) {
            average = sum / (float)allParentResponses.Count;
         }

         return new {
            title= this.Title,
            count = average
         };
      }
   }
}