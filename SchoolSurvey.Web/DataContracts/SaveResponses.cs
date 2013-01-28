using System.Collections.Generic;

namespace SchoolSurvey.Web.DataContracts {
   public class SaveResponses {
      public int UserId { get; set; }
      public List<SurveyResponse> Responses { get; set; }
   }
}