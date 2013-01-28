using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Mindscape.LightSpeed;
using SchoolSurvey.Web.DataAccess;
using SchoolSurvey.Web.Infrastructure;

namespace SchoolSurvey.Web.Controllers
{
   public class BaseController : Controller {
      private const string UNIT_OF_WORK = "__UnitOfWork__";
      private UnitOfWorkScopeBase<SurveyModelUnitOfWork> _unitOfWorkScope;


      protected JsonResult Json(Object objectData, bool allowGet) {
         if (allowGet) {
            return new JsonNetResult(objectData, JsonRequestBehavior.AllowGet);
         }
         else {
            return new JsonNetResult(objectData, JsonRequestBehavior.DenyGet);
         }
      }

      public UnitOfWorkScopeBase<SurveyModelUnitOfWork> UnitOfWorkScope {
         get {
            if (_unitOfWorkScope == null && System.Web.HttpContext.Current != null) {
               _unitOfWorkScope =
                  System.Web.HttpContext.Current.Items[UNIT_OF_WORK] as PerRequestUnitOfWorkScope<SurveyModelUnitOfWork>;
            }

            if (_unitOfWorkScope == null) {
               _unitOfWorkScope =
                  new PerRequestUnitOfWorkScope<SurveyModelUnitOfWork>(MvcApplication.LightSpeedDataContext);

               if (System.Web.HttpContext.Current != null) {
                  System.Web.HttpContext.Current.Items[UNIT_OF_WORK] = _unitOfWorkScope;
               }
            }

            return _unitOfWorkScope;
         }
      }

      protected SurveyModelUnitOfWork UnitOfWork {
         get { return UnitOfWorkScope.Current; }
      }

      protected override void OnResultExecuted(ResultExecutedContext filterContext) {
         if (_unitOfWorkScope != null) {
            _unitOfWorkScope.Dispose();
         }

         base.OnResultExecuted(filterContext);
      }

      public new void Dispose() {
         if (_unitOfWorkScope != null) {
            _unitOfWorkScope.Dispose();
         }

         base.Dispose();
      }
   }
}
