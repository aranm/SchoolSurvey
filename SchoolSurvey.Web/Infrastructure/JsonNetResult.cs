using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace SchoolSurvey.Web.Infrastructure {
   public class JsonNetResult : JsonResult {
      public JsonNetResult(object objectData, JsonRequestBehavior jsonRequestBehavior) {
         this.Data = objectData;
         this.JsonRequestBehavior = jsonRequestBehavior;
      }

      public override void ExecuteResult(ControllerContext context) {
         if (context == null)
            throw new ArgumentNullException("context");

         var response = context.HttpContext.Response;

         response.ContentType = !String.IsNullOrEmpty(ContentType) ? ContentType : "application/json";

         if (ContentEncoding != null)
            response.ContentEncoding = ContentEncoding;

         if (Data == null)
            return;

         // If you need special handling, you can call another form of SerializeObject below
         var serializedObject = JsonConvert.SerializeObject(Data, Formatting.None);
         response.Write(serializedObject);
      }
   }
}