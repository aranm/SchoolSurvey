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

      public JsonResult StartNewSurvey() {
         //create a new user
         var newUser = new Parent();
         this.UnitOfWork.Add(newUser);
         this.UnitOfWork.SaveChanges();

         //get all the questions
         var questions = this.UnitOfWork.Questions.Select(item => item.CopyToIncludingResponses());

         return base.Json(new { user = newUser.Id, questions = questions }, true);
      }

      public ActionResult CleanDataStore() {
         //create a new user
         this.UnitOfWork.Questions.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.Parents.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.ParentResponses.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.Responses.ToList().ForEach(item => this.UnitOfWork.Remove(item));
         this.UnitOfWork.SaveChanges();

         return base.Json(new { }, true);
      }

      public ActionResult ImportQuestions() {

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

         this.UnitOfWork.SaveChanges();

         return base.Json(new { }, true);
      }
   }
}
