define("AjaxConfiguration", ["Core.Ajax"], function (ajax) {
   return {
      configure: function () {

         ajax.UrlMapper.addMapping({ name: "errorLog", url: "Error/LogError", ajaxType: "POST" });
         ajax.UrlMapper.addMapping({ name: "GetHelpData", url: "Help/GetHelpData", ajaxType: "POST", queueRequest: true, cache: true });

        
      }
   };
});