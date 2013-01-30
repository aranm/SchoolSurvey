using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSurvey.Web.DataAccess {
   public partial class FinalQuestions {
      public object CopyTo() {
         return new {
            id = this.Id,
            question = this.Question
         };
      }
   }
}