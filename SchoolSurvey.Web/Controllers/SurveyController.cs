using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using SchoolSurvey.Web.DataAccess;
using SchoolSurvey.Web.DataContracts;

namespace SchoolSurvey.Web.Controllers {
   public class SurveyController : BaseController {

      public JsonResult StartNewSurvey() {
         //create a new user
         var newUser = new Parent();
         this.UnitOfWork.Add(newUser);
         this.UnitOfWork.SaveChanges();

         //get all the questions
         var questions = this.UnitOfWork
            .Questions
            .OrderBy(item => item.Id)
            .Select(item => item.CopyToIncludingResponses());

         //get the final questions
         var finalQuestions = this.UnitOfWork
            .FinalQuestions
            .OrderBy(item => item.Id)
            .Select(item => item.CopyTo());

         return base.Json(new { user = newUser.Id, questions = questions, finalQuestions = finalQuestions }, true);
      }

      public JsonResult SaveCurrentResponses(SaveResponses saveResponses) {

         var user = this.UnitOfWork.Parents.FirstOrDefault(item => item.Id == saveResponses.UserId);
         if (user == null) { }
         else {
            foreach(var userResponse in saveResponses.Responses) {
               var response = this.UnitOfWork.Responses.FirstOrDefault(item => item.Id == userResponse.Id);
               if (response != null) {
                  var parentResponse = new ParentResponse {
                     Parent = user,
                     Response = response,
                     Spent = userResponse.Value
                  };
                  this.UnitOfWork.Add(parentResponse);
               }
            }

            this.UnitOfWork.SaveChanges();
         }
         return base.Json(new { }, true);
      }

      public JsonResult SaveFinalQuestions(FinalQuestionResponses finalQuestionResponses) {
         var user = this.UnitOfWork.Parents.FirstOrDefault(item => item.Id == finalQuestionResponses.UserId);
         if (user == null) { }
         else {
            foreach (var userResponse in finalQuestionResponses.Responses) {
               var finalQuestion = this.UnitOfWork.FinalQuestions.FirstOrDefault(item => item.Id == userResponse.Id);
               if (finalQuestion != null) {
                  var parentResponse = new FinalResponse {
                     Parent = user,
                     FinalQuestions = finalQuestion,
                     Response = userResponse.Response
                  };
                  this.UnitOfWork.Add(parentResponse);
               }
            }

            this.UnitOfWork.SaveChanges();
         }
         return base.Json(new { }, true);         
      }
   }
}
