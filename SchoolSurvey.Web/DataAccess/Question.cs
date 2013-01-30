using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSurvey.Web.DataAccess {
   public partial class Question {

      public object CopyToIncludingResponses() {
         return new {
            id = Id,
            maximumSpend = MaximumSpend,
            spendUnits = SpendUnits,
            description = this.Description,
            title = this.Title,
            responses = this.Responses.Select(item => item.CopyTo())
         };
      }

      public object CopyTo() {
         return new {
            id = Id,
            maximumSpend = MaximumSpend,
            spendUnits = SpendUnits,
            description = this.Description,
            title = this.Title
         };
      }
   }
}