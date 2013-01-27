using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SchoolSurvey.Web {
   public class RouteConfig {
      public static void RegisterRoutes(RouteCollection routes) {
         routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
         routes.MapRoute(
            name: "JavaScriptBundle",
            url: "scripts/v1.01/application.js",
            defaults: new { controller = "Resource", action = "JavaScriptBundle" });

         routes.MapRoute(
            name: "Template",
            url: "scripts/v1.01/templates/{*templateName}",
            defaults: new { controller = "Resource", action = "Template" });

         routes.MapRoute(
            name: "ModuleGrouping",
            url: "scripts/v1.01/ModuleGroupings/{*scriptName}",
            defaults: new { controller = "Resource", action = "JavascriptModuleGrouping" });

         routes.MapRoute(
            name: "Javascript",
            url: "scripts/v1.01/{*scriptName}",
            defaults: new { controller = "Resource", action = "JavascriptFile" });

         routes.MapRoute(
             name: "Default",
             url: "{controller}/{action}/{id}",
             defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
         );
      }
   }
}