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
   }
}