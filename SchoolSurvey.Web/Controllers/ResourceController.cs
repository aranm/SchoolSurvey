using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using SchoolSurvey.Web.Filters;

namespace SchoolSurvey.Web.Controllers
{

   public class ResourceController : Controller {
      private IPathFinder _path;

      [Compress]
      public ActionResult JavascriptBundle() {
         _path = new PathFinder(HttpContext, new UrlHelper(this.ControllerContext.RequestContext));
         string content;
         if (HttpContext.IsDebuggingEnabled) {
            content = ReadApplicationScript("~/scripts/main.js");
            return Content(content, "application/javascript");
         }
         else {
            content = ReadApplicationScript("~/scripts/Built/main.js");
            return Content(content, "application/javascript");
         }
      }

      [Compress]
      public ActionResult JavascriptModuleGrouping(String scriptName) {
         _path = new PathFinder(HttpContext, new UrlHelper(this.ControllerContext.RequestContext));
         string content;
         if (HttpContext.IsDebuggingEnabled) {
            content = ReadApplicationScript(string.Format("~/scripts/ModuleGroupings/{0}", scriptName));
            return Content(content, "application/javascript");
         }
         else {
            content = ReadApplicationScript(string.Format("~/scripts/Built/ModuleGroupings/{0}", scriptName));
            return Content(content, "application/javascript");
         }
      }

      [Compress]
      public ActionResult JavascriptFile(String scriptName) {
         _path = new PathFinder(HttpContext, new UrlHelper(this.ControllerContext.RequestContext));
         string content;
         if (HttpContext.IsDebuggingEnabled) {
            content = ReadApplicationScript(string.Format("~/scripts/{0}", scriptName));
            return Content(content, "application/javascript");
         }
         else {
            content = ReadApplicationScript(string.Format("~/scripts/Built/{0}", scriptName));
            return Content(content, "application/javascript");
         }
      }

      [Compress]
      public ActionResult Template(String templateName) {
         var index = templateName.IndexOf('.');
         if (index > 0) {
            templateName = templateName.Substring(0, index);
         }
         var content = RenderPartialViewToString(this, templateName, null);
         return Content(content, "text/html");
      }

      private static string RenderPartialViewToString(Controller controller, string pathToView, object viewModel,
                                                     ViewDataDictionary viewData = null) {
         String result;
         var viewEngine = ViewEngines.Engines.FindPartialView(controller.ControllerContext, pathToView);

         using (var writer = new StringWriter()) {
            var vd = viewData == null
                                       ? new ViewDataDictionary(viewModel)
                                       : new ViewDataDictionary(viewData) { Model = viewModel };
            var viewContext = new ViewContext(controller.ControllerContext,
                                                      viewEngine.View,
                                                      vd,
                                                      new TempDataDictionary(), writer);
            viewEngine.View.Render(viewContext, writer);
            result = writer.ToString();
         }
         return result;
      }
      private string ReadApplicationScript(string file) {
         return System.IO.File.ReadAllText(_path.MapToFileSystem(file)).Replace("%ApplicationPath%", Url.Content("~/"));
      }

   }

   /// <summary>
   /// Provides an interface that components can use to resolve paths in a web application
   /// </summary>
   public interface IPathFinder {
      string Resolve(string virtualPath);
      string MapToFileSystem(string virtualPath);
      string[] FindFiles(string directory, string filter, SearchOption options);
   }

   public class PathFinder : IPathFinder {
      private readonly HttpContextBase _context;
      private readonly UrlHelper _urlHelper;

      public PathFinder(HttpContextBase context, UrlHelper urlHelper) {
         _context = context;
         _urlHelper = urlHelper;
      }

      public string Resolve(string virtualPath) {
         return _urlHelper.Content(virtualPath);
      }

      public string MapToFileSystem(string virtualPath) {
         return _context.Server.MapPath(virtualPath);
      }

      public string[] FindFiles(string directory, string filter, SearchOption options) {
         return Directory.GetFiles(directory, filter, options);
      }
   }
}
