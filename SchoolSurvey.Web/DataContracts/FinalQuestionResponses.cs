using System.Collections.Generic;

namespace SchoolSurvey.Web.DataContracts {
   public class FinalQuestionResponses {
      public int UserId { get; set; }
      public List<FinalQuestionResponse> Responses { get; set; }
   }
}