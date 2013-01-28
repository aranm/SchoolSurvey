define("AjaxConfiguration", ["Core.Ajax"], function (ajax) {
   return {
      configure: function () {
         ajax.UrlMapper.addMapping({ name: "StartNewSurvey", url: "Home/StartNewSurvey", ajaxType: "GET" });
      }
   };
});