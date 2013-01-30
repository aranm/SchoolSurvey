define("AjaxConfiguration", ["Core.Ajax"], function (ajax) {
   return {
      configure: function () {
         ajax.UrlMapper.addMapping({ name: "StartNewSurvey", url: "Survey/StartNewSurvey", ajaxType: "GET" });
         ajax.UrlMapper.addMapping({ name: "SaveCurrentResponses", url: "Survey/SaveCurrentResponses", ajaxType: "POST" });
         ajax.UrlMapper.addMapping({ name: "SaveFinalQuestions", url: "Survey/SaveFinalQuestions", ajaxType: "POST" });
         ajax.UrlMapper.addMapping({ name: "GetQuestionNumbers", url: "Statistics/GetQuestionNumbers", ajaxType: "POST" });
         ajax.UrlMapper.addMapping({ name: "GetStatisticsForQuestion", url: "Statistics/GetStatisticsForQuestion", ajaxType: "POST" });
      }
   };
});