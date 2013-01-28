define("AjaxConfiguration", ["Core.Ajax"], function (ajax) {
   return {
      configure: function () {
         ajax.UrlMapper.addMapping({ name: "StartNewSurvey", url: "Survey/StartNewSurvey", ajaxType: "GET" });
         ajax.UrlMapper.addMapping({ name: "SaveCurrentResponses", url: "Survey/SaveCurrentResponses", ajaxType: "POST" });
      }
   };
});