using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using SchoolSurvey.Web.DataAccess;
using SchoolSurvey.Web.Properties;

namespace SchoolSurvey.Web.Controllers {
   public class HomeController : BaseController {
      public ActionResult Index() {
         ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

         return View();
      }

      public ActionResult CleanDataStore() {
         //create a new user
         this.UnitOfWork.Questions.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.Parents.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.ParentResponses.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.Responses.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.FinalQuestions.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.FinalResponses.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.SaveChanges();

         return base.Json(new { }, true);
      }

      public ActionResult ImportQuestions() {

         CleanDataStore();

         foreach (string line in Regex.Split(Resources.Questions, System.Environment.NewLine).ToList().Where(s => !string.IsNullOrEmpty(s))) {
            string[] values = Regex.Split(line, ",");

            var question = new Question {
               Title = values[0],
               Description = values[1],
               MaximumSpend = Int32.Parse(values[2]),
               SpendUnits = values[3]
            };

            this.UnitOfWork.Add(question);

            values.Skip(4).ToList().ForEach(responseText => {
               var response = new Response {
                  Question = question,
                  Title = responseText
               };
               this.UnitOfWork.Add(response);

            });
         }

         foreach (string line in Regex.Split(Resources.FinalQuestions, System.Environment.NewLine).ToList().Where(s => !string.IsNullOrEmpty(s))) {
            string[] values = Regex.Split(line, ",");

            foreach (var value in values) {
               var finalQuestion = new FinalQuestions {
                  Question = value
               };
               this.UnitOfWork.Add(finalQuestion);
            }
         }

         this.UnitOfWork.SaveChanges();

         return base.Json(new { }, true);
      }
   }
}
