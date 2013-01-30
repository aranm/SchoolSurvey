define("RoutingConfiguration", ["Core.Navigation"], function (navigation) {
   return {
      configure: function () {
         //Landing Screen
         navigation.addLoadAndNavigate({ name: "HomeScreen", listensTo: "OpenHomeScreen", startsModuleGroup: "HomeScreen" });
         navigation.addLoadAndNavigate({ name: "StatisticsScreen", listensTo: "OpenStatisticsScreen", startsModuleGroup: "StatisticsScreen" });
      }
   };
});