using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolSurvey.Web.DataAccess;

namespace SchoolSurvey.Web.Controllers {
   public class StatisticsController : BaseController {
      //
      // GET: /Statistics/

      public JsonResult GetQuestionNumbers() {
         //get all the questions
         var questions = this.UnitOfWork
            .Questions
            .OrderBy(item => item.Id)
            .Select(item => item.CopyTo());

         return base.Json(questions, true);
      }

      public JsonResult GetStatisticsForQuestion(int questionId) {
         //get all the questions
         var question = this.UnitOfWork
            .Questions
            .OrderBy(item => item.Id)
            .FirstOrDefault(item => item.Id == questionId);

         if (question != null) {
            var responseData = question.Responses.OrderBy(item => item.Id).Select(item => item.CopyToForStatistics()).ToList();
            return base.Json(responseData, true);
         }
         else {
            return base.Json("Error", true);
         }
      }
   }
}
